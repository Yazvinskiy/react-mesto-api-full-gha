import React from 'react';

function PopupWithForm(props) {
  const {
    title,
    name,
    children,
    submitBtnText,
    isOpen,
    onClose,
    onSubmit,
    disabled,
  } = props;

  React.useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;
    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener('keydown', closeByEscape);
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        <button type="button" className="popup__btn-close" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" onSubmit={onSubmit} >
          {children}
          <button type="submit" className="popup__btn-save" disabled={disabled}>
            {submitBtnText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
