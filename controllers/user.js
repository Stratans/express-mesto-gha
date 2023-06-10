const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((userData) => res.send({ data: userData }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
module.exports.createUser = ((req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((userData) => {
      res.status(201).send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
});

// ПОЛУЧЕНИЕ АЙДИ ПОЛЬЗОВАТЕЛЯ
module.exports.getUserById = ((req, res) => {
  user.findById(req.params._id)
    .then((userData) => {
      if (!userData) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректное айди' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});

// ОБНОВЛЕНИЕ ПРОФИЛЯ
module.exports.updateProfile = ((req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  user.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .then((userData) => {
      if (!userData) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректное данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});

// ОБНОВЛЕНИЕ АВАТАРА
module.exports.updateAvatar = ((req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  user.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .then((userData) => {
      if (!userData) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректное данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});