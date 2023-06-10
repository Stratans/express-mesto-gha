const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');

const { NOT_FOUND } = require('../utils/constants');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
