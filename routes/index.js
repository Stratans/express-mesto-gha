const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./user');
const cardRouter = require('./card');
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFound');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/users', userRouter);

router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Приехали! Страница не найдена!'));
});

module.exports = router;
