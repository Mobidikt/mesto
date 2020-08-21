import { Popup } from "./Popup.js";
export class PopupVerification extends Popup {
  constructor(popupSelector, submitVerification) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__button");
    this._submit = submitVerification;
  }
  submit() {
    this._submit(this._deleteCard);
  }
  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => this.submit());
  }
  open(deleteCard) {
    super.open();
    this._deleteCard = deleteCard;
  }
}
