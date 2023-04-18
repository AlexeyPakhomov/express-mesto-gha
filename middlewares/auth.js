const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const { UnauthorizedError } = require('../errors/unauthorized-err'); //401

const auth = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация 1'));
  }
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'); // пытаемся верифицировать токен
    console.log(`payload ${payload}`);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация 2'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  console.log(req.user);

  next();
};

module.exports = { auth };
