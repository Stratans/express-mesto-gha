const card = require('../models/card');

const {
  CREATED,
  ERROR,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../utils/constants');

// ПОЛУЧЕНИЕ ВСЕХ КАРТОЧЕК
module.exports.getCards = (req, res) => {
  card.find({})
    .populate(['owner', 'likes'])
    .then((cardData) => res.send({ data: cardData }))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

// СОЗДАНИЕ КАРТОЧКИ
module.exports.createCard = ((req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card.create({ name, link, owner })
    .then((cardData) => {
      res.status(CREATED).send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR).send({ message: 'Некорректные данные' });
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
});

// УДАЛЕНИЕ КАРТОЧКИ ПО АЙДИ
module.exports.deleteCard = ((req, res) => {
  const cardId = req.params._id;
  card.findByIdAndRemove(cardId)
    .then((cardData) => {
      if (!cardData) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR).send({ message: 'Некорректный айди' });
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
});

// СТАВИМ ЛАЙК КАРТОЧКЕ
module.exports.likeCard = ((req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR).send({ message: 'Некорректный айди' });
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
});

// СТАВИМ ДИЗЛАЙК КАРТОЧКЕ
module.exports.dislikeCard = ((req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })

    .then((cardData) => {
      if (!cardData) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR).send({ message: 'Некорректный айди' });
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
});
