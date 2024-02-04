function ImagePopup(props) {
  return (
    <div
      className={`popup popup_photos_background ${
        props.card && "popup_opened"
      }`}
      id="popup-photos"
      onClick={props.onCloseClickOverlay}
    >
      <div className="popup__photos-container">
        <img
          className="popup__image"
          src={props.card && props.card.link}
          alt={props.card && props.card.name}
        />
        <h2 className="popup__photos-title">{props.card && props.card.name}</h2>
        <button
          className="popup__cancel-button"
          type="button"
          title="Закрыть"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
