require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users.routes');
const cardsRoutes = require('./routes/cards.routes');
const { limiter } = require('./utils/config');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { NotFoundError } = require('./errors/not-found-err');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(limiter); // Ограничение распространяется на все окна
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '643f1fb891e3cd549c296a21',
  };

  next();
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /https?:\/\/(www\.)?[0-9a-zA-Z-]{1,100}\.[0-9a-zA-Z]{1,6}(\/[0-9a-zA-Z\/\S]*)*/,
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
//app.use(auth);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  console.log(err.statusCode);
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT);
