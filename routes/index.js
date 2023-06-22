const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const { createUser, login } = require('../controllers/user');
const { NOT_FOUND } = require('../utils/constants');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
