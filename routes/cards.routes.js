const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  deleteCardById,
  createCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(/https?:\/\/(www\.)?[0-9a-zA-Z-]{1,100}\.[0-9a-zA-Z]{1,6}(\/[0-9a-zA-Z/\S]*)*/),
    }),
  }),
  createCard,
);
router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  deleteCardById,
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  putCardLike,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  deleteCardLike,
);

module.exports = router;
