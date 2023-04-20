const { celebrate, Joi } = require('celebrate');

const joiSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      /https?:\/\/(www\.)?[0-9a-zA-Z-]{1,100}\.[0-9a-zA-Z]{1,6}(\/[0-9a-zA-Z/\S]*)*/,
    ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const joiSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const joiGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
});

const joiUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const joiUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(
      /https?:\/\/(www\.)?[0-9a-zA-Z-]{1,100}\.[0-9a-zA-Z]{1,6}(\/[0-9a-zA-Z/\S]*)*/,
    ),
  }),
});

const joiCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .regex(/https?:\/\/(www\.)?[0-9a-zA-Z-]{1,100}\.[0-9a-zA-Z]{1,6}(\/[0-9a-zA-Z/\S]*)*/),
  }),
});

const joiDeleteCardAndlike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
});

module.exports = {
  joiSignUp,
  joiSignIn,
  joiGetUserById,
  joiUpdateProfile,
  joiUpdateAvatar,
  joiCreateCard,
  joiDeleteCardAndlike,
};
