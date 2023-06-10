const card = require('../models/card');

// ПОЛУЧЕНИЕ ВСЕХ КАРТОЧЕК
module.exports.getCards = (req, res) => {
  card.find({})
    .populate(['owner', 'likes'])
    .then((cardData) => res.send({ data: cardData }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// СОЗДАНИЕ КАРТОЧКИ
module.exports.createCard = ((req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card.create({ name, link, owner })
    .then((cardData) => {
      res.status(201).send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});

// УДАЛЕНИЕ КАРТОЧКИ ПО АЙДИ
module.exports.deleteCard = ((req, res) => {
  const cardId = req.params._id;
  card.findByIdAndRemove(cardId)
    .then((cardData) => {
      if (!cardData) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный айди' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});
