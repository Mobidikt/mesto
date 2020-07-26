import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup, formSubmitMesto, init } from "./utils.js";
import {
  profileForm,
  mestoForm,
  popup,
  popupMesto,
  popupSelectors,
  editButton,
  closeButtonPhoto,
  closeButtonMesto,
  addButton,
  closeButton,
  nameInput,
  job,
  jobInput,
  popupPhoto,
  name,
} from "./constants.js";

closeButton.addEventListener("click", () => closePopup(popup));
addButton.addEventListener("click", () => openPopupMesto(popupMesto));

const profileValidation = new FormValidator(popupSelectors, profileForm);
const mestoValidation = new FormValidator(popupSelectors, mestoForm);
const elementList = document.querySelector(".place__list");

closeButtonMesto.addEventListener("click", () => closePopup(popupMesto));

mestoForm.addEventListener("submit", formSubmitMesto);

closeButtonPhoto.addEventListener("click", () => closePopup(popupPhoto));

function openPopupMesto() {
  mestoForm.reset();
  openPopup(popupMesto);
  mestoValidation.enableValidation();
}

function openPopupProfile() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popup);
  profileValidation.enableValidation();
}
editButton.addEventListener("click", openPopupProfile);

function formSubmitHandler(e) {
  e.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popup);
}
profileForm.addEventListener("submit", formSubmitHandler);

init();
