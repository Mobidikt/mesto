export class FormValidator {
  constructor(popupSelectors, formElement) {
    this._form = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(popupSelectors.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      popupSelectors.submitButtonSelector
    );
    this._inputErrorClass = popupSelectors.inputErrorClass;
    this._errorClass = popupSelectors.errorClass;
    this._inactiveButton = popupSelectors.inactiveButtonClass;
  }
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }
  _actualizeButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButton);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButton);
      this._buttonElement.disabled = false;
    }
  }
  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._actualizeButtonState();
      });
    });
  }

  resetForm() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._actualizeButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
