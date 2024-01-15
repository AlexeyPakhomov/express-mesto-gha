[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд

Создание бэкенда для приложения Mesto.

## Директории

`/routes` — папка с файлами роутера
`/controllers` — папка с файлами контроллеров пользователя и карточки
`/models` — папка с файлами описания схем пользователя и карточки

Остальные директории вспомогательные, создаются при необходимости разработчиком.

## Запуск проекта

`npm run start` — запускает сервер  
`npm run dev` — запускает сервер с hot-reload

[Ссылка на express-mesto-gha](https://github.com/AlexeyPakhomov/express-mesto-gha)

<!--### Процесс реализации

1.  Создать `package.json` командой `npm init -y`
2.  Настроить ` .editorconfig`
3.  Настроить линтер(eslint) по стайлгайду — Airbnb

    **Процесс установки:**

    - Установить линтер командой _npm i eslint_

      **Установить ещё две dev-зависимости, чтобы линтер работал по правилам стайлгайда Airbnb:**
      _ npm i eslint-config-airbnb-base _
      _ npm i eslint-plugin-import _

      - Настроить файл .eslintrc и добавить команды lint в файл package.json

4.  Создать файл `.gitignore`
5.  Создать точку входа(файл `app.js`)
6.  Подключить Express командой `npm i express`
7.  Подключить nodemon для hot reload c флагом -D командой `npm i nodemon -D`
8.  Подключить Mongoose командой `npm i mongoose`
9.  Запустить сервер Mongo командой `brew services start mongodb-community@4.4`
    ~~ 10. Подключить стилизацию строк в консоли командой `npm i chalk@4.1.2` ~~
10. Подключить helmet для защиты приложения от некоторых широко известных веб-уязвимостей командой `npm install --save helmet`
11. Подключить Express rate limit для защиты от DoS атак `npm install express-rate-limit`
12. Создать схемы и модели User и Cards. В User подключить Validator (`npm i validator`) для валидации email
13. Создать контроллеры и роуты для Users и Сards

14. Подключить `bcryptjs` и в контроллере createUser делать хэширование пароля
15. Создать контроллер login для сверки email и password с дальнейшим созданием JWT токена. Подключить jsonwebtoken(`npm i jsonwebtoken`)
16. Создать роут для логина и регистрации
17. Сделать мидлвэр для авторизации в файле `middlewares/auth.js`
18. Создать контроллер и роут для получения информации о пользователе

Создать секретный ключ с помощью `crypto`, занести ключ в переменные окружения (файл с расширением .env, так же файл добавить в .gitignore:) и добавить в Node.js с помощью модуля dotenv(`npm i dotenv`)

централизованные ошибки

подключить валидацию Joi в качестве мидлвэр, мы будем использовать библиотеку celebrate.-->
