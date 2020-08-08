// import "../pages/index.css";
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
// import { Popup } from "./Popup.js";
import { UserInfo } from "./UserInfo.js";

// closeButton.addEventListener("click", () => closePopup(popup));
addButton.addEventListener("click", () => openPopupMesto(popupMesto));

const profileValidation = new FormValidator(popupSelectors, profileForm);
const mestoValidation = new FormValidator(popupSelectors, mestoForm);
profileValidation.enableValidation();
mestoValidation.enableValidation();
// const popupTest = new Popup(popupSelectors);
// const profilePopupForm = new PopupWithForm(popupSelectors, submitForm);
// const mestoPopupForm = new PopupWithForm();
// closeButtonMesto.addEventListener("click", () => closePopup(popupMesto));
const user = new UserInfo(name, job);
mestoForm.addEventListener("submit", formSubmitMesto);

// closeButtonPhoto.addEventListener("click", () => closePopup(popupPhoto));

function openPopupMesto() {
  mestoForm.reset();
  openPopup(popupMesto);
  mestoValidation.resetForm();
}

function openPopupProfile() {
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;
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
  const name = nameInput.value;
  const job = jobInput.value;
  user.setUserInfo(name, job);
  closePopup(popup);
}
profileForm.addEventListener("submit", formSubmitHandler);

init();
