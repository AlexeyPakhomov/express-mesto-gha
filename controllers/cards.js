const Card = require('../models/Card');
const { ERROR_VALIDATION, ERROR_CAST, ERROR_SERVER } = require('../utils/constant');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию.' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию.' });
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_CAST).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.status(200).send(card))
        .catch(next);
    })
    .catch(() => res.status(ERROR_VALIDATION).send({ message: 'Удаление карточки с некорректным id' }))
    .catch(next);
};

const putCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_CAST).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(200).send(card);
    })
    .catch(
      () => res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' }),
      // return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию.' });
    );
};

const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_CAST).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(200).send(card);
    })
    .catch(() => res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  putCardLike,
  deleteCardLike,
};
