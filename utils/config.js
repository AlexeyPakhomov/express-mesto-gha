const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 8 * 60 * 1000, // 8 минут
  max: 100, // Ограничиваем каждый IP-адрес 100 запросами на `окно` ( в теч. 8 минут)
  standardHeaders: false, // Скрываем информацию об ограничении в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключаем заголовки `X-RateLimit-*`
  message: 'Превышено допустимое количество запросов. Попробуйте повторить запрос позднее.', // Сообщение при превышении кол-ва запросов
});

//Генерация секретных ключей

//const crypto = require('crypto'); // экспортируем crypto
//const randomString = crypto
//  .randomBytes(32) // сгенерируем случайную последовательность 16 байт (128 бит)
//  .toString('hex'); // приведём её к строке
//console.log(randomString);

module.exports = { limiter };
