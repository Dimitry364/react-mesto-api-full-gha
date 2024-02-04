import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import imgResolve from "../images/popup/resolve.svg";
import imgReject from "../images/popup/reject.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = React.useState(false);
  const [isAvatarPlaceLoading, setIsAvatarPlaceLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [emailName, setEmailName] = React.useState(null);
  const [authorizationResult, setAuthorizationResult] = React.useState("");
  const [popupTitle, setPopupTitle] = React.useState("");
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const navigate = useNavigate();

  function onRegister(email, password) {
    auth
      .registerUser({ email, password })
      .then(() => {
        setAuthorizationResult(imgResolve);
        setPopupTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setAuthorizationResult(imgReject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function onLogin(email, password) {
    auth
      .loginUser({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate("/");
      })
      .catch(() => {
        setAuthorizationResult(imgReject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailName(res.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn === true)
    {
      api
        .getInitialData()
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUser({ name, about })
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAvatarUpdate(data) {
    setIsAvatarPlaceLoading(true);
    api
      .updateAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsAvatarPlaceLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsAddPlaceLoading(true);
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsAddPlaceLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handlePopupCloseClickByOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard(null);
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/sign-in"
              element={
                <>
                  <Header title="Регистрация" route="/sign-up" />
                  <Login onLogin={onLogin} />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header title="Войти" route="/sign-in" />
                  <Register onRegister={onRegister} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header
                    title="Выйти"
                    mail={emailName}
                    onClick={onSignOut}
                    route=""
                  />
                  <ProtectedRoute
                    component={Main}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} replace />}
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseClickOverlay={handlePopupCloseClickByOverlay}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleAvatarUpdate}
            onCloseClickOverlay={handlePopupCloseClickByOverlay}
            isLoading={isAvatarPlaceLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleAddPlaceSubmit}
            onCloseClickOverlay={handlePopupCloseClickByOverlay}
            isLoading={isAddPlaceLoading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseClickOverlay={handlePopupCloseClickByOverlay}
          />
          <InfoTooltip
            image={authorizationResult}
            title={popupTitle}
            isOpen={infoTooltip}
            onCloseClickOverlay={handlePopupCloseClickByOverlay}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
