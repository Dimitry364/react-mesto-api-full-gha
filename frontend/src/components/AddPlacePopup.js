import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  // Спасибо большое за помощь и ценную информацию для меня
  // позже попробую разобраться и реалезовать
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    evt.target.reset();

    props.onUpdateUser({
      name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseClickOverlay={props.onCloseClickOverlay}
      id={"popup-add"}
      form={"card-create"}
      title={"Новое место"}
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="popup__add-name-input"
          className="popup__input"
          type="text"
          minLength="2"
          maxLength="30"
          name="name"
          value={name}
          placeholder="Название"
          onChange={handleNameChange}
          required
        />
        <span className="popup__add-name-input-error popup__input-error" />
      </div>
      <div className="popup__field">
        <input
          id="popup__add-link-input"
          className="popup__input"
          type="url"
          name="link"
          value={link}
          placeholder="Ссылка на картинку"
          onChange={handleLinkChange}
          required
        />
        <span className="popup__add-link-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
