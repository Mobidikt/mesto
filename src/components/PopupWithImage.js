import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(img) {
    // console.log(this._popup.querySelector(".popup__picture").src);
    // console.log(this._popup.querySelector(".popup__caption").textContent);
    // this._popup.classList.add("popup_opened");
    // document.addEventListener("keydown", this._handleEscClose);
    // document.addEventListener("click", this._overlayClose);
    super.open();
    const imgPopup = {};
    imgPopup.text = img.name;
    imgPopup.src = img.link;
    return imgPopup;
  }
}
