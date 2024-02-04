const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");
const {
  userIdValidator,
  updateProfileValidator,
  updateAvatarValidator
} = require("../middlewares/validation");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", userIdValidator, getUser);
router.patch("/me", updateProfileValidator, updateProfile);
router.patch("/me/avatar", updateAvatarValidator, updateAvatar);

module.exports = router;