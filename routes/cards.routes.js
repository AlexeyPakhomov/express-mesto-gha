const router = require('express').Router();
const {
  joiCreateCard,
  joiDeleteCard,
  joiPutCardLike,
  joiDeleteCardLike,
} = require('../middlewares/joiValidation');

const {
  getCards,
  deleteCardById,
  createCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', joiCreateCard, createCard);
router.delete('/:cardId', joiDeleteCard, deleteCardById);
router.put('/:cardId/likes', joiPutCardLike, putCardLike);
router.delete('/:cardId/likes', joiDeleteCardLike, deleteCardLike);

module.exports = router;
