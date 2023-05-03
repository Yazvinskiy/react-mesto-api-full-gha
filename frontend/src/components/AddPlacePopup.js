import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function AddPlacePopup(props) {
  const {
    isOpen,
    onClose,
    onAddPlace,
    isLoader,
    onLoading,
  } = props;

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
    onAddPlace(data);
  };

  useEffect(() => {
    reset();
  }, [isOpen]);
 

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      submitBtnText={isLoader ? 'Создать' : 'Создать...'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoader={isLoader}
      disabled={!isValid}
    >
      <input
        {...register('cardName', {
          required: {
            value: true,
            message: 'Введите логин',
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
        placeholder="Название"
        className="popup__input popup__input_card_title"
      />
      <p className="placelink-input-error popup__error">
        {errors.cardName && errors.cardName.message}
      </p>

      <input
        {...register('cardLink', {
          required: {
            value: true,
            message: 'Введите ссылку на изображения',
          },  
        })}
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_card_link"
      />
      <p className="placelink-input-error popup__error">
        {errors.cardLink && errors.cardLink.message}
      </p>
    </PopupWithForm>
  );
}
export default AddPlacePopup;


