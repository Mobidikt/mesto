import "./pages/index.css";
import { FormValidator } from "./components/FormValidator.js";
import { checkAmountOfCards } from "./components/utils.js";
import {
  profileForm,
  mestoForm,
  popup,
  popupMesto,
  popupSelectors,
  editButton,
  addButton,
  nameInput,
  job,
  jobInput,
  popupPhoto,
  name,
  nameMesto,
  srcMesto,
  elementList,
  popupCaption,
  popupPicture,
} from "./components/constants.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Card } from "./components/Card.js";
import { initialCards } from "./components/initial-cards.js";
import { Section } from "./components/Section.js";

const profileValidation = new FormValidator(popupSelectors, profileForm);
const mestoValidation = new FormValidator(popupSelectors, mestoForm);
const userPopup = new PopupWithForm(popup, profileForm, formSubmitHandler);
const addMestoPopup = new PopupWithForm(popupMesto, mestoForm, formSubmitMesto);
const user = new UserInfo(name, job);
const imgPopup = new PopupWithImage(popupPhoto);
let cardList;
imgPopup.setEventListeners();
profileValidation.enableValidation();
mestoValidation.enableValidation();
userPopup.setEventListeners();
addMestoPopup.setEventListeners();

function openPopupMesto() {
  addMestoPopup.open();
  mestoValidation.resetForm();
}

function openPopupProfile() {
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;
  userPopup.open();
  profileValidation.resetForm();
}

addButton.addEventListener("click", openPopupMesto);
editButton.addEventListener("click", openPopupProfile);

function addCard(item, elementTemplate, cardSelector) {
  const card = new Card(
    item,
    elementTemplate,
    cardSelector,
    handleCardClick,
    checkAmountOfCards
  );
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}
function formSubmitMesto(e) {
  e.preventDefault();
  const newCard = {
    name: nameMesto.value,
    link: srcMesto.value,
  };
  addCard(newCard, ".element-template", ".card");
  addMestoPopup.close();
  checkAmountOfCards(); // при удалении всех карточек и добавление первой новой, необходимо спрятать элемент
}

function formSubmitHandler(e) {
  e.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  user.setUserInfo(name, job);
  userPopup.close();
}
function handleCardClick(img) {
  const { text, src } = imgPopup.open(img);
  popupCaption.textContent = text;
  popupPicture.src = src;
}

function init() {
  cardList = new Section(
    {
      data: initialCards,
      renderer: (item) => {
        addCard(item, ".element-template", ".card");
      },
    },
    elementList
  );
  cardList.renderer();
  checkAmountOfCards();
}

init();
