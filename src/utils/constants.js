const container = document.querySelector(".content"); //общий контейнер
export const popup = document.querySelector(".popup_type_profile"); // попап
const popupContainer = popup.querySelector(".popup__container"); //контейнер попап
export const editButton = container.querySelector(".profile__btn_edit"); //кнопка редактирования информации
export const closeButton = popupContainer.querySelector(".popup__close"); //кнопка закрытие попап
export const profileForm = popup.querySelector(".popup__form");
export const nameInput = popupContainer.querySelector(".popup__input_name");
export const jobInput = popupContainer.querySelector(".popup__input_job");
export const addButton = container.querySelector(".profile__btn_add"); // кнопка добавления места
export const nameElement = container.querySelector(".profile__name"); //имя профиля
export const jobElement = container.querySelector(".profile__job"); // информация о профиле
export const avatarElement = container.querySelector(".profile__avatar");
export const popupPhoto = document.querySelector(".popup_type_photo");
export const closeButtonPhoto = popupPhoto.querySelector(".popup__close");
export const popupMesto = document.querySelector(".popup_type_add-card"); //попап добавления места
export const nameMesto = popupMesto.querySelector(".popup__input_mesto"); //Имя нового метса
export const srcMesto = popupMesto.querySelector(".popup__input_src"); // Адрес картинки нового места
export const mestoForm = popupMesto.querySelector(".popup__form_mesto"); // форма попап место
export const closeButtonMesto = popupMesto.querySelector(".popup__close"); //кнопка закрытие попап места
export const noCardsPlaceholder = document.querySelector(".place__placeholder");
export const elementList = document.querySelector(".place__list");
export const popupCaption = popupPhoto.querySelector(".popup__caption");
export const popupPicture = popupPhoto.querySelector(".popup__picture");
export const popupVerification = document.querySelector(
  ".popup_type_verification"
);
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const avatarForm = popupAvatar.querySelector(".popup__form");
export const editButtonAvatar = container.querySelector(".profile__btn_avatar");
export const srcAvatar = popupAvatar.querySelector(".popup__input");
export const cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".card");

export const popupSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const serverUrl = "https://mesto.nomoreparties.co/v1/cohort-14";
export const authorization = "7a3dfd49-072e-4055-86f4-4cec12a9c522";
