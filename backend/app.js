const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
require('dotenv').config();

const app = express();
const PORT = 3000;
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {
  console.log('Connecting mongo');
}).catch((err) => {
  console.log(`Error ${err}`);
});

app.use(express.json());
app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const jwt = require('jsonwebtoken');
const YOUR_JWT = '22b46a2754e41c74d354c45f5c974bf3'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'dev-secret'; // вставьте сюда секретный ключ для разработки из кода
try {
const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
console.log(
'\x1b[32m%s\x1b[0m',
'Всё в порядке. Секретные ключи отличаются'
);
} else {
console.log(
'\x1b[33m%s\x1b[0m',
'Что-то не так',
err
);
}
}

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});

