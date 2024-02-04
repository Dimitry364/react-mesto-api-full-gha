import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  function handleName(evt) {
    setName(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseClick={props.onCloseClick}
      id={"popup-edit"}
      form={"profiel-edit"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="popup__edit-name-input"
          className="popup__input"
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          placeholder="Имя"
          value={name}
          onChange={handleName}
          required
        />
        <span className="popup__edit-name-input-error popup__input-error" />
      </div>
      <div className="popup__field">
        <input
          id="popup__edit-about-input"
          className="popup__input"
          type="text"
          minLength="2"
          maxLength="200"
          name="about"
          placeholder="О себе"
          value={description}
          onChange={handleDescription}
          required
        />
        <span className="popup__edit-about-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
