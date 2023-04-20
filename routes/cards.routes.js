const router = require('express').Router();
const {
  joiCreateCard,
  joiDeleteCardAndlike,
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
router.delete('/:cardId', joiDeleteCardAndlike, deleteCardById);
router.put('/:cardId/likes', joiDeleteCardAndlike, putCardLike);
router.delete('/:cardId/likes', joiDeleteCardAndlike, deleteCardLike);

module.exports = router;
