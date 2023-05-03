import React from 'react';
function ImagePopup(props) {
  const { card, onClose, isOpen } = props;
  return (
    <div
      className={`popup popup_type_full-image ${isOpen ? 'popup_opened' : ''}`}
    >
      <figure className="popup__figure">
        <button type="button" className="popup__btn-close" onClick={onClose} />
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
