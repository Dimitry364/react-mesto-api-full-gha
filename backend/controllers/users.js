const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const CastError = mongoose.Error.CastError;
const ValidationError = mongoose.Error.ValidationError;
const User = require("../models/user");
const AuthError = require("../errors/AuthError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const { jwtKey } = require("../utils/jwtKey");
const { Created } = require("../utils/statusCode");
const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : jwtKey,
        {
          expiresIn: "7d",
        }
      );

      res.send({ token });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getCurrentUser = (req, res) => {
  req.params.userId = req.user._id;
  getUser(req, res);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new NotFoundError("Пользователь не найден"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof CastError)
        next(new BadRequestError("Переданы некорректные данные"));
      else next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(Created).send(user))
      .catch((err) => {
        if (err instanceof ValidationError)
          next(
            new BadRequestError(
              "Переданы некорректные данные при создании пользователя"
            )
          );
        else if (err.code === 11000)
          next(
            new ConflictError("Пользователь с таким email уже зарегестрирован")
          );
        else next(err);
      })
  );
};

function updateProfile(req) {
  const { name, about } = req.body;
  return { name, about };
}

function updateAvatar(req) {
  const { avatar } = req.body;
  return { avatar };
}

function updateUserDecorator(update) {
  return function (req, res, next) {
    User.findByIdAndUpdate(req.user._id, update(req), {
      new: true,
      runValidators: true,
    })
      .orFail(() => new NotFoundError("Пользователь не найден"))
      .then((user) => res.send(user))
      .catch((err) => {
        if (err instanceof ValidationError)
          next(
            new BadRequestError(
              "Переданы некорректные данные при обновлении профиля или аватар"
            )
          );
        else next(err);
      });
  };
}

updateProfile = updateUserDecorator(updateProfile);
updateAvatar = updateUserDecorator(updateAvatar);

module.exports = {
  getUsers,
  getCurrentUser,
  getUser,
  login,
  createUser,
  updateProfile,
  updateAvatar,
};
