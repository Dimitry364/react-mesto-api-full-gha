const { celebrate, Joi } = require("celebrate");
const isUrl = require("validator/lib/isURL");
const BadRequestError = require("../errors/BadRequestError");
const { regExpUrlAvatar } = require("../utils/regExp");

const validationUrl = (url) => {
  const validate = isUrl(url);

  if (validate)
    return url;

  throw new BadRequestError("Некорректный адрес URL");
};

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExpUrlAvatar),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validationUrl),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExpUrlAvatar),
  }),
});

module.exports = {
  loginValidator,
  userValidator,
  createCardValidator,
  cardIdValidator,
  userIdValidator,
  updateProfileValidator,
  updateAvatarValidator,
};
