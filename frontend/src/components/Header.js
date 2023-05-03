import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ userEmail, onSignOut, loggedIn }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {isActive && loggedIn && (
        <div
          className="header__link__container menu__state_active"
          onClick={handleClick}
        >
          <p className="header__email">{userEmail}</p>
          <Link to="/sign-in" className="header__link" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      )}

      <header className="header">
        <img className="header__logo" src={logo} alt="Лого-место" />
        {loggedIn &&  userEmail &&(
          <span
            className={`header__burger-menu ${
              isActive ? 'menu__state_inactive' : ''
            }`}
            onClick={handleClick}
          >
            &#9776;
          </span>
        )}

        <Routes>
          <Route
            path="sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                {loggedIn ? '' : 'Регистрация'}
              </Link>
            }
          ></Route>
        </Routes>
        {loggedIn && (
          <div className="header__link__container">
            <p className="header__email">{userEmail}</p>
            <Link to="/sign-in" className="header__link" onClick={onSignOut}>
           {userEmail ? 'Выйти' : 'Регистрация'}
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
