import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__img-mask">
            <button
              className="profile__avatar-edit"
              type="button"
              title="Обновить аватар"
              onClick={props.onEditAvatar}
            />
            <img
              className="profile__avatar"
              alt={currentUser.name}
              src={currentUser.avatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__name">
                <span className="profile__span">{currentUser.name}</span>
              </h1>
              <button
                className="profile__edit-button"
                type="button"
                title="Редактировать профиль"
                onClick={props.onEditProfile}
              />
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить фотографию"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((cardsData) => (
            <Card
              key={cardsData._id}
              card={cardsData}
              likes={cardsData.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
