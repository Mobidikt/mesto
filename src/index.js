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
} from "./components/constants.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupVerification } from "./components/PopupVerification.js";
import { Api } from "./components/Api.js";

const profileValidation = new FormValidator(popupSelectors, profileForm);
const mestoValidation = new FormValidator(popupSelectors, mestoForm);
const avatarValidation = new FormValidator(popupSelectors, avatarForm);
const userPopup = new PopupWithForm(popup, profileForm, formSubmitHandler);
const addMestoPopup = new PopupWithForm(popupMesto, mestoForm, formSubmitMesto);
let user;
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
let cardList;
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
imgPopup.setEventListeners();
profileValidation.enableValidation();
mestoValidation.enableValidation();
avatarValidation.enableValidation();
userPopup.setEventListeners();
addMestoPopup.setEventListeners();
verificationPopup.setEventListeners();
avatarPopup.setEventListeners();

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
  const { text, src } = imgPopup.open(img);
  popupCaption.textContent = text;
  popupPicture.src = src;
}
function handleCardDelete(deleteCard) {
  verificationPopup.open(deleteCard);
}
function submitVerification(deleteCard) {
  deleteCard();
  verificationPopup.close();
}
addButton.addEventListener("click", openPopupMesto);
editButton.addEventListener("click", openPopupProfile);
editButtonAvatar.addEventListener("click", openPopupAvatar);

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
function formSubmitAvatar(e) {
  e.preventDefault();
  avatarPopup.renderLoading(true, "Сохранение");
  api
    .editUserAvatar(srcAvatar.value)
    .then(({ avatar }) => {
      user.setUserAvatar(avatar);
      updateUserInfoView();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.close();
      avatarPopup.renderLoading(false, "Сохранить");
    });
}
function formSubmitMesto(e) {
  e.preventDefault();
  const newCard = {
    name: nameMesto.value,
    link: srcMesto.value,
  };
  addMestoPopup.renderLoading(true, "Сохранение");
  api
    .createCard(newCard)
    .then((res) => {
      const userCard = addCard(res);
      elementList.append(userCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addMestoPopup.close();
      addMestoPopup.renderLoading(false, "Сохранить");
      checkAmountOfCards(); // при удалении всех карточек и добавление первой новой, необходимо спрятать элемент
    });
}

function formSubmitHandler(e) {
  e.preventDefault();
  userPopup.renderLoading(true, "Сохранить");
  const info = { name: nameInput.value, about: jobInput.value };
  api
    .editUserInfo(info)
    .then((info) => user.setUserInfo(info.name, info.about))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      userPopup.close();
      userPopup.renderLoading(false, "Сохранить");
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
