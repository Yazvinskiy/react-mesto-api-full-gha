import React from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';


function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar, isLoader, onLoading } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    onLoading();
    onUpdateAvatar(data);
  };

  useEffect(() => {
    reset()
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      submitBtnText={isLoader ? 'Сохранить' : 'Сохранить...'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!isValid}
    >
      <input
        {...register('linkAvatar', {
          required: {
            value: true,
            message: 'Введите URL',
          },
        })}
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_card_link"
      />
      <p className="placelink-input-error popup__error">
        {errors.linkAvatar && errors.linkAvatar.message}
      </p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
