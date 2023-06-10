const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch(() => console.log('Ошибка соединения с базой данных'));

app.use((req, res, next) => {
  req.user = {
    _id: '6484651b1ae75a1fabf96305',
  };

  next();
});

// const userRouter = require('./routes/user');
// const cardRouter = require('./routes/card');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
// app.use('/users', userRouter);
// app.use('/cards', cardRouter);
// app.use((req, res) => {
//   res.status(404).send({ message: 'Страница не найдена' });
// });

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
