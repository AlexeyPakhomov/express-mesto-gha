require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { limiter } = require('./utils/config');
const routes = require('./routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(limiter); // Ограничение распространяется на все окна
app.use(bodyParser.json());
app.use(requestLogger); // подключаем логгер запросов до всех роутов

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(errors()); // обработчик ошибок celebrate

app.use(error);

app.listen(PORT);
