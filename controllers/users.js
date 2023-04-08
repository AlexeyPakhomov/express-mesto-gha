const User = require('../models/User');
const { ERROR_VALIDATION, ERROR_CAST, ERROR_SERVER } = require('../utils/constant');

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию.' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при создании пользователя.' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_CAST).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(200).send(user);
    })
    .catch(
      () => res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при поиске пользователя.' }),
      // return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию.' });
    );
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_CAST).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, upsert: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_CAST).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports = { getUsers, getUserById, createUser, updateProfile, updateAvatar };
