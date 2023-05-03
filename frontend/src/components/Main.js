import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    cards,
    onConformationPopup,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__hover-effect">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватарка"
            />
            <div className="profile__overlay" />
            <button
              type="button"
              className="profile__edit-avatar-button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__content">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onConformationPopup={onConformationPopup}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
