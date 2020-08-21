import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, formSubmitHandler) {
    super(popupSelector);
    this._form = submitForm;
    this._closeButton = this._popup.querySelector(".popup__close");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._button = popupSelector.querySelector(".popup__button");
    this._submit = formSubmitHandler;
  }
  _getInputValues() {
    const info = {};
    this._inputList.forEach((input) => {
      info[input.id] = input.value;
    });
    return info;
  }
  renderLoading(isLoading, text) {
    if (isLoading) {
      this._button.textContent = `${text}...`;
    } else {
      this._button.textContent = text;
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }
  close() {
    super.close();
    this._form.reset();
  }
}
