import React from 'react';
import { useForm } from 'react-hook-form';

const Login = ({ onSubmit, onLoading }) => {
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
      <h2 className="popup__title-auth">Вход</h2>
      <form className="popup__form" onSubmit={handleSubmit(handleValueSubmit)}>
        <input
          className="popup__input-auth"
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
          placeholder="Email"
        />
        <p className="placelink-input-error popup__error">
          {errors.email && errors.email.message}
        </p>
        <input
          type="password"
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
          className="popup__input-auth"
          placeholder="Пароль"
        />
        <p className="placelink-input-error popup__error">
          {errors.password && errors.password.message}
        </p>
        <button type="submit" className=" popup__btn-auth" disabled={!isValid}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
