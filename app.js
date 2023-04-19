require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { limiter } = require('./utils/config');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { joiSignUp, joiSignIn } = require('./middlewares/joiValidation');
const usersRoutes = require('./routes/users.routes');
const cardsRoutes = require('./routes/cards.routes');
const { NotFoundError } = require('./errors/not-found-err');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(limiter); // Ограничение распространяется на все окна
app.use(bodyParser.json());

app.post('/signup', joiSignUp, createUser);
app.post('/signin', joiSignIn, login);
app.use(auth);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT);
