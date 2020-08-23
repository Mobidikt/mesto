import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { checkAmountOfCards } from "../utils/utils.js";
import {
  profileForm,
  mestoForm,
  popup,
  popupMesto,
  popupSelectors,
  editButton,
  addButton,
  nameInput,
  jobElement,
  jobInput,
  popupPhoto,
  nameElement,
  nameMesto,
  srcMesto,
  elementList,
  popupCaption,
  popupPicture,
  popupVerification,
  serverUrl,
  authorization,
  avatarElement,
  popupAvatar,
  avatarForm,
  editButtonAvatar,
  srcAvatar,
  cardTemplate,
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupVerification } from "../components/PopupVerification.js";
import { Api } from "../components/Api.js";

let user;
let cardList;
const profileValidation = new FormValidator(popupSelectors, profileForm);
const mestoValidation = new FormValidator(popupSelectors, mestoForm);
const avatarValidation = new FormValidator(popupSelectors, avatarForm);
const userPopup = new PopupWithForm(popup, profileForm, formSubmitHandler);
const addMestoPopup = new PopupWithForm(popupMesto, mestoForm, formSubmitMesto);
const imgPopup = new PopupWithImage(popupPhoto);
const verificationPopup = new PopupVerification(
  popupVerification,
  submitVerification
);
const avatarPopup = new PopupWithForm(
  popupAvatar,
  avatarForm,
  formSubmitAvatar
);
const api = new Api({ serverUrl, authorization });

api
  .getInitialUserInfo()
  .then((userInfo) => {
    user = new UserInfo(userInfo);
    updateUserInfoView();
    api
      .getInitialCards()
      .then((cardList) => Promise.all(cardList))
      .then(init)
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

function openPopupMesto() {
  addMestoPopup.open();
  mestoValidation.resetForm();
}

function updateUserInfoView() {
  const { avatar, name, about } = user.getUserInfo();
  jobElement.textContent = about;
  nameElement.textContent = name;
  avatarElement.src = avatar;
}
function openPopupProfile() {
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().about;
  userPopup.open();
  profileValidation.resetForm();
}
function openPopupAvatar() {
  avatarPopup.open();
  avatarValidation.resetForm();
}
function handleCardClick(img) {
  const { text, src, alt } = imgPopup.open(img);
  popupCaption.textContent = text;
  popupPicture.src = src;
  popupPicture.alt = alt;
}
function handleCardDelete(deleteCard) {
  verificationPopup.open(deleteCard);
}
function submitVerification(deleteCard) {
  deleteCard();
  verificationPopup.close();
}

function addCard(card) {
  return new Card({
    card,
    cardTemplate,
    handleCardClick,
    api,
    userId: user.getUserId(),
    handleCardDelete,
  }).createCard();
}
function formSubmitAvatar() {
  return api.editUserAvatar(srcAvatar.value).then(({ avatar }) => {
    user.setUserAvatar(avatar);
    updateUserInfoView();
  });
}
function formSubmitMesto() {
  const newCard = {
    name: nameMesto.value,
    link: srcMesto.value,
  };
  return api.createCard(newCard).then((res) => {
    const userCard = addCard(res);
    elementList.append(userCard);
  });
}

function formSubmitHandler() {
  const info = { name: nameInput.value, about: jobInput.value };
  return api.editUserInfo(info).then((info) => {
    user.setUserInfo(info.name, info.about);
    updateUserInfoView();
  });
}

function init(initialCards) {
  cardList = new Section(
    {
      data: initialCards,
      renderer: (item) => {
        const card = addCard(item);
        cardList.addItem(card);
      },
    },
    elementList
  );
  cardList.renderer();
  checkAmountOfCards();
}

imgPopup.setEventListeners();
profileValidation.enableValidation();
mestoValidation.enableValidation();
avatarValidation.enableValidation();
userPopup.setEventListeners();
addMestoPopup.setEventListeners();
verificationPopup.setEventListeners();
avatarPopup.setEventListeners();
addButton.addEventListener("click", openPopupMesto);
editButton.addEventListener("click", openPopupProfile);
editButtonAvatar.addEventListener("click", openPopupAvatar);
