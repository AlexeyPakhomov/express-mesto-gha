require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { limiter } = require('./utils/config');
const routes = require('./routes');
const error = require('./middlewares/error');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(limiter); // Ограничение распространяется на все окна
app.use(bodyParser.json());

app.use(routes);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(errors()); // обработчик ошибок celebrate

app.use(error);

app.listen(PORT);
