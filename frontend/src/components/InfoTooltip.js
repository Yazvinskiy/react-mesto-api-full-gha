import React from 'react';
import logoSuccess from '../images/success.svg';
import logoUnsuccess from '../images/unsuccess.svg';

const InfoTooltip = ({ onClose, isOpen, infoToolStatus }) => {
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
      className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        <button type="button" className="popup__btn-close" onClick={onClose} />
        <img
        className="popup__info-image"
          src={infoToolStatus ? logoSuccess : logoUnsuccess}
          alt={'Лого-результат'}
        />
        <h2 className="popup__info-title">
          {infoToolStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
};

export default InfoTooltip;
