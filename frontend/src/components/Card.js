import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_active" : ""
  }`;

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        title="Удалить"
        onClick={handleDeleteClick}
      />
      <div className="element__info">
        <h2 className="element__caption">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            title="Нравится"
            onClick={handleLikeClick}
          />
          <h3 className="element__like-counter">{props.likes}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
