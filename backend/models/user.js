const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
// "Нужно добавить опцию, чтобы пароль не возвращался при запросах".
// Прошу обратить Ваше внимание на то, что это поле не возвращается.
// А если я добавляю метод select, то все приожение ломается
// В самом низу есть метод , который удаляет пароль

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Неверный формат почты'],
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [isURL, 'Неверный формат URL'],
  },

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.password;
  delete data.__v;

  return data;
};

module.exports = mongoose.model('user', userSchema);
