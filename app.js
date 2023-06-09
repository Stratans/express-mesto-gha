const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { SERVER_ERROR } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch(() => console.log('Ошибка соединения с базой данных'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === SERVER_ERROR ? 'Ошибка сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log('Ура! Сервер запущен!');
});
