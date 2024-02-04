import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen && `popup_opened`}`}
      id={`${props.id}`}
      onClick={props.onCloseClickOverlay}
    >
      <div className="popup__container">
        <form
          className="popup__form"
          action="#"
          name={props.form}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          <fieldset className="popup__fieldset">
            {props.children}
            <button
              className="popup__button"
              name="submit"
              type="submit"
              title={props.buttonText}
            >
              {props.buttonText}
            </button>
          </fieldset>
          <button
            className="popup__cancel-button"
            type="button"
            onClick={props.onClose}
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
