import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refAvatar = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      avatarSrc: refAvatar.current.value,
    });
  }

  React.useEffect(() => {
    refAvatar.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseClickOverlay={props.onCloseClickOverlay}
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      id={"popup-add-avatar"}
      name={"avatar"}
      form={"card-create"}
      title={"Обновить аватар"}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          ref={refAvatar}
          className="popup__input"
          id="popup__add-avatar-link-input"
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__add-avatar-link-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
