import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = ({ onSubmit, onLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const handleValueSubmit = (data) => {
    onLoading();
    onSubmit(data);
    reset()
  };

  return (
    <div className="popup__container-auth">
      <h2 className="popup__title-auth">Регистрация</h2>
      <form onSubmit={handleSubmit(handleValueSubmit)} className="popup__form">
        <input
          className="popup__input-auth"
          name="email"
          placeholder="Email"
          type="email"
          {...register('email', {
            required: {
              value: true,
              message: 'Введите email',
            },
            minLength: {
              value: 6,
              message: 'Минимальная длинна логина - 6 символа',
            },
            maxLength: {
              value: 30,
              message: 'Максимальное число символов 40',
            },
          })}
        />
        <p className="placelink-input-error popup__error">
          {errors.email && errors.email.message}
        </p>
        <input
          className="popup__input-auth"
          name="password"
          placeholder="Пароль"
          {...register('password', {
            required: {
              value: true,
              message: 'Введите пароль',
            },
            minLength: {
              value: 8,
              message: 'Минимальная длинна пароля - 8 символа',
            },
            maxLength: {
              value: 30,
              message: 'Максимальное число символов 30',
            },
          })}
        />
        <p className="placelink-input-error popup__error">
          {errors.password && errors.password.message}
        </p>
        <button type="submit" className=" popup__btn-auth" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
      <div className="signup-container">
        <p className="signup-container__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="signup-container__link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
