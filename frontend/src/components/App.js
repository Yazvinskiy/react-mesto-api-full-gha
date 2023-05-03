import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import NotFound from './NotFound';
import ConfirmationPopup from './ConfirmationPopup';
import { api } from '../utils/api';
import { checkToken, authorize, register } from '../utils/auth';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isAddPlacePopupOpen, setISAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopup] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardToDelete, setSelectedCardToDelete] = useState({});
  const [isLoader, setIsLoader] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [infoToolStatus, setInfoToolStatus] = useState(true);
  const navigate = useNavigate();

  const handleSingUp = async (data) => {
    try {
      await register(data);
      setLoggedIn(true);
      setInfoToolStatus(true);
      setIsInfoTooltipPopupOpen(true);
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
      setInfoToolStatus(false);
      setIsInfoTooltipPopupOpen(true);
    }
  };

  const handleSingIn = async (data) => {
    try {
      const jwt = await authorize(data);
      localStorage.setItem('token', jwt.token);
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.log(error);
      setInfoToolStatus(false);
      setIsInfoTooltipPopupOpen(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in');
  };

  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      checkToken(jwt).then((res) => {
        setUserEmail(res.data.email);
        setLoggedIn(true);
          navigate("/"); 
      })
      .catch((err) => console.log(err))
    }
  }, [navigate]);


  const getUserInfo = async () => {
    try {
      const userInfo = await api.getUserData();
      setCurrentUser(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const getCards = async () => {
    try {
      const cards = await api.getInitialCards();
      setCards(cards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getCards();
  }, []);

  const handleCardLike = async (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .likeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    } else {
      api
        .dislikeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    }
  };

  const handleAddPlaceSubmit = async (card) => {
    try {
      const newCard = await api.createCard(card);
      setCards([newCard, ...cards]);
      handleCloseAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(true);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards(cards.filter((c) => c._id !== card._id));
      handleCloseAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(true);
    }
  };

  const handleUpdateUser = async (onUpdateUser) => {
    try {
      const updateUser = await api.setUserData(onUpdateUser);
      setCurrentUser(updateUser);
      handleCloseAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(true);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const updateAvatar = await api.editAvatar(data);
      setCurrentUser(updateAvatar);
      handleCloseAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(true);
    }
  };

  const handleOpenPopupPlace = () => {
    setISAddPlacePopupOpen(true);
  };

  const handleOpenPopupProfile = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleOpenPopupAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleOpenPopupConformation = (card) => {
    setIsConfirmationPopup(true);
    setSelectedCardToDelete(card);
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  const handleCloseAllPopups = () => {
    setISAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopup(false);
    setIsInfoTooltipPopupOpen(false);
  };

  const handleLoading = () => {
    setIsLoader(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header
            userEmail={userEmail}
            onSignOut={handleSignOut}
            loggedIn={loggedIn}
          />
          <Routes>
          <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  onAddPlace={handleOpenPopupPlace}
                  onEditProfile={handleOpenPopupProfile}
                  onEditAvatar={handleOpenPopupAvatar}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onConformationPopup={handleOpenPopupConformation}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onSubmit={handleSingUp} onLoading={handleLoading}/>}
            />
            <Route
              path="/sign-in"
              element={<Login onSubmit={handleSingIn} onLoading={handleLoading}/>}
            />
          </Routes>
          <Footer />
        </div>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={handleLoading}
          isLoader={isLoader}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoader={isLoader}
          onLoading={handleLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoader={isLoader}
          onLoading={handleLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={handleCloseAllPopups}
          card={selectedCard}
        />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={handleCloseAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCardToDelete}
          isLoader={isLoader}
          onLoading={handleLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={handleCloseAllPopups}
          infoToolStatus={infoToolStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
