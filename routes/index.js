const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');
const { joiSignUp, joiSignIn } = require('../middlewares/joiValidation');
const usersRoutes = require('./users.routes');
const cardsRoutes = require('./cards.routes');

router.post('/signup', joiSignUp, createUser);
router.post('/signin', joiSignIn, login);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
