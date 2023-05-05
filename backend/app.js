const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = 3000;
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(
  cors({
    origin: ['http://instamesto.nomoredomains.monster',
      'https://instamesto.nomoredomains.monster',
      'https://localhost:3000',
      'http://localhost:3000'],
  }),
);

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
