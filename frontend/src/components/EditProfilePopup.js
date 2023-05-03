import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser, isLoader, onLoading } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  React.useEffect(() => {
    setValue('name', currentUser.name ?? '');
    setValue('description', currentUser.about ?? '');
  }, [currentUser, isOpen]);

  function onSubmit(data) {
    onLoading();
    onUpdateUser(data);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitBtnText={isLoader ? 'Сохранить' : 'Сохранить...'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!isValid}
    >
      <input
        {...register('name', {
          required: {
            value: true,
            message: 'Заполните это поле',
          },
          minLength: {
            value: 2,
            message: 'Минимальная длинна логина - 3 символа',
          },
          maxLength: {
            value: 30,
            message: 'Максимальное число символов 30',
          },
        })}
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_user_name"
      />
      <p className="placelink-input-error popup__error">
        {errors.name && errors.name.message}
      </p>

      <input
        {...register('description', {
          required: {
            value: true,
            message: 'Заполните это поле',
          },
          minLength: {
            value: 3,
            message: 'Минимальная длинна логина - 3 символа',
          },
          maxLength: {
            value: 30,
            message: 'Максимальное число символов 30',
          },
        })}
        type="text"
        placeholder="Вид деятельности"
        className="popup__input popup__input_user_profession"
      />
      <p className="placelink-input-error popup__error">
        {errors.description && errors.description.message}
      </p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
