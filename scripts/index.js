const container = document.querySelector(".content"); //общий контейнер
const popup = document.querySelector(".popup_type_profile"); // попап
const popupContainer = popup.querySelector(".popup__container"); //контейнер попап
const editButton = container.querySelector(".profile__btn_edit"); //кнопка редактирования информации
const closeButton = popupContainer.querySelector(".popup__close"); //кнопка закрытие попап
const formElement = popup.querySelector(".popup__form");
const nameInput = popupContainer.querySelector(".popup__input_name");
const jobInput = popupContainer.querySelector(".popup__input_job");
const addButton = container.querySelector(".profile__btn_add"); // кнопка добавления места
const name = container.querySelector(".profile__name"); //имя профиля
const job = container.querySelector(".profile__job"); // информация о профиле
const errorList = Array.from(document.querySelectorAll(".popup__error"));
const inputList = Array.from(document.querySelectorAll(".popup__input"));
const popupPhoto = document.querySelector(".popup_type_photo");
const closeButtonPhoto = popupPhoto.querySelector(".popup__close");
const popupMesto = document.querySelector(".popup_type_add-card"); //попап добавления места
const nameMesto = popupMesto.querySelector(".popup__input_mesto"); //Имя нового метса
const srcMesto = popupMesto.querySelector(".popup__input_src"); // Адрес картинки нового места
const formMesto = popupMesto.querySelector(".popup__form_mesto"); // форма попап место
const closeButtonMesto = popupMesto.querySelector(".popup__close"); //кнопка закрытие попап места
const elementTemplate = document.querySelector(".element-template");
const elementList = document.querySelector(".place__list");
const noCardsPlaceholder = container.querySelector(".place__placeholder");
const popupCaption = popupPhoto.querySelector(".popup__caption");
const popupPicture = popupPhoto.querySelector(".popup__picture");

const initialCards = [
  {
    name: "Москва",
    link:
      "https://images.unsplash.com/photo-1552065769-8079333a8c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Сочи",
    link:
      "https://images.unsplash.com/photo-1549092156-04ee20673b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
function createCard(card) {
  const element = elementTemplate.content.cloneNode(true);
  const elementImg = element.querySelector(".card__image");
  element.querySelector(".card__title").textContent = card.name;
  elementImg.src = card.link;
  elementImg.alt = card.name;
  return element;
}

function closeEsc(e) {
  if (e.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function mouseClick(e) {
  if (e.target.classList.contains("popup")) {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
  document.addEventListener("click", mouseClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
}

closeButton.addEventListener("click", () => closePopup(popup));

function openPopupMesto() {
  formMesto.reset();
  openPopup(popupMesto);
  setInitialState(popupMesto);
}
addButton.addEventListener("click", () => openPopupMesto(popupMesto));

function checkMesto() {
  if (elementList.firstElementChild) {
    noCardsPlaceholder.classList.add("place__placeholder_hidden");
  } else {
    noCardsPlaceholder.classList.remove("place__placeholder_hidden");
  }
}

function deleteElement(e) {
  const element = e.target.closest(".card");
  element.remove(); //реализация удаления
  checkMesto();
}

function setOpenPhoto(img) {
  popupCaption.textContent = img.alt;
  popupPicture.src = img.src;
}

// Модальное окно картинки
function openPhoto(e) {
  setOpenPhoto(e.target);
  openPopup(popupPhoto);
}

function likeMesto(e) {
  e.target.classList.toggle("card__like_active"); //реализация лайков
}

function addCardListeners(element) {
  element
    .querySelector(".card__delete")
    .addEventListener("click", deleteElement);
  element.querySelector(".card__like").addEventListener("click", likeMesto);
  element.querySelector(".card__image").addEventListener("click", openPhoto); //реализация попап картинки
}
function addCard(card) {
  const cardElement = createCard(card);
  addCardListeners(cardElement);
  elementList.prepend(cardElement);
}

closeButtonMesto.addEventListener("click", () => closePopup(popupMesto));

function formSubmitMesto(e) {
  e.preventDefault();
  const newCard = {
    name: nameMesto.value,
    link: srcMesto.value,
  };
  addCard(newCard);
  closePopup(popupMesto);
  checkMesto(); // при удалении всех карточек и добавление первой новой, необходимо спрятать элемент
}
formMesto.addEventListener("submit", formSubmitMesto);

closeButtonPhoto.addEventListener("click", () => closePopup(popupPhoto));

function openPopupProfile() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popup);
  setInitialState(popup);
}
editButton.addEventListener("click", openPopupProfile);

function formSubmitHandler(e) {
  e.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popup);
}
formElement.addEventListener("submit", formSubmitHandler);

function init() {
  initialCards.reverse().forEach(addCard);
  // Проверяем наличие карточек на странице (пустой ли массив)
  checkMesto();
}
init();
