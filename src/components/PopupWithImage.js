import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(img) {
    super.open();
    const imgPopup = {};
    imgPopup.text = img.name;
    imgPopup.src = img.link;
    imgPopup.alt = img.name;
    return imgPopup;
  }
}
