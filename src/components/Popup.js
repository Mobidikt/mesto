export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closeButton = this._popup.querySelector(".popup__close");
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  _overlayClose(e) {
    if (e.target.classList.contains("popup")) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
    document.addEventListener("click", (e) => this._overlayClose(e));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
    document.removeEventListener("click", (e) => this._overlayClose(e));
  }
}
