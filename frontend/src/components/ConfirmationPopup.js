import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup(props) {
  const { card, isOpen, onClose, onCardDelete , isLoader, onLoading} = props;

  function handleSubmit(e) {
    e.preventDefault();
    onLoading();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      submitBtnText={isLoader ? "Да" : "Да..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmationPopup;
