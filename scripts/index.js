import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup, init, addCard, checkMesto } from "./utils.js";
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
  nameMesto,
  srcMesto,
} from "./constants.js";

closeButton.addEventListener("click", () => closePopup(popup));
addButton.addEventListener("click", () => openPopupMesto(popupMesto));

const profileValidation = new FormValidator(popupSelectors, profileForm);
const mestoValidation = new FormValidator(popupSelectors, mestoForm);
profileValidation.enableValidation();
mestoValidation.enableValidation();

closeButtonMesto.addEventListener("click", () => closePopup(popupMesto));

mestoForm.addEventListener("submit", formSubmitMesto);

closeButtonPhoto.addEventListener("click", () => closePopup(popupPhoto));

function openPopupMesto() {
  mestoForm.reset();
  openPopup(popupMesto);
  mestoValidation.resetForm();
}

function openPopupProfile() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popup);
  profileValidation.resetForm();
}
editButton.addEventListener("click", openPopupProfile);

function formSubmitMesto(e) {
  e.preventDefault();
  const newCard = {
    name: nameMesto.value,
    link: srcMesto.value,
  };
  addCard(newCard, ".element-template", ".card");
  closePopup(popupMesto);
  checkMesto(); // при удалении всех карточек и добавление первой новой, необходимо спрятать элемент
}

function formSubmitHandler(e) {
  e.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popup);
}
profileForm.addEventListener("submit", formSubmitHandler);

init();
