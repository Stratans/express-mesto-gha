const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch(() => console.log('Ошибка соединения с базой данных'));

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
