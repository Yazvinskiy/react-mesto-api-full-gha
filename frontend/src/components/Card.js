import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card(props) {
  const { card, onCardClick, onCardLike, onConformationPopup } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClicks() {
    onConformationPopup(card);
  }

  return (
    <div className="places__card">
      <img
        className="places__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          onClick={handleDeleteClicks}
          type="button"
          className="places__icon-basket "
        />
      )}
      <div className="places__content">
        <h2 className="places__title">{card.name}</h2>
        <div>
          <button
            onClick={handleLikeClick}
            type="button"
            className={`places__icon-like ${
              isLiked && 'places__icon-like_active'
            }`}
          />
          <div className="places__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
