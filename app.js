const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users.routes');
const cardsRoutes = require('./routes/cards.routes');
const { ERROR_CAST } = require('./utils/constant');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6431ce8d2a2d397ddef58d5b',
  };

  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res) => res.status(ERROR_CAST).send('Страница не найдена.'));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => console.log('The server is running'));
