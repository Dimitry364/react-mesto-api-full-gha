const router = require("express").Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { createCardValidator, cardIdValidator } = require("../middlewares/validation");

router.get("/", getCards);
router.post("/", createCardValidator, createCard);
router.put("/:cardId/likes", cardIdValidator, likeCard);
router.delete("/:cardId", cardIdValidator, deleteCard);
router.delete("/:cardId/likes", cardIdValidator, dislikeCard);

module.exports = router;
