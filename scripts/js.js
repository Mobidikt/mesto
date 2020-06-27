const container = document.querySelector(".content"); //общий контейнер
const popup = document.querySelector(".popup_type_profile"); // попап
const popupContainer = popup.querySelector(".popup__container"); //контейнер попап
const editButton = container.querySelector(".profile__btn_edit"); //кнопка редактирования информации
const closeButton = popupContainer.querySelector(".popup__close"); //кнопка закрытие попап
const formElement = popup.querySelector(".popup__form");
const nameInput = popupContainer.querySelector(".popup__text_name");
const jobInput = popupContainer.querySelector(".popup__text_job");
const addButton = container.querySelector(".profile__btn_add"); // кнопка добавления места
const name = container.querySelector(".profile__name"); //имя профиля
const job = container.querySelector(".profile__job"); // информация о профиле

const popupPhoto = document.querySelector(".popup_type_photo");
const closeButtonPhoto = popupPhoto.querySelector(".popup__close");
const popupMesto = document.querySelector(".popup_type_add-card"); //попап добавления места
const nameMesto = popupMesto.querySelector(".popup__text_mesto"); //Имя нового метса
const srcMesto = popupMesto.querySelector(".popup__text_src"); // Адрес картинки нового места
const formMesto = popupMesto.querySelector(".popup__form_mesto"); // форма попап место
const closeButtonMesto = popupMesto.querySelector(".popup__close"); //кнопка закрытие попап места
const elementTemplate = document.querySelector(".element-template");
const elementList = document.querySelector(".elements__items");

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

initialCards.forEach((card) => {
  addCard(card);
});
function addCard(card) {
  const element = elementTemplate.content.cloneNode(true);
  element.querySelector(".element__title").textContent = card.name;
  element.querySelector(".element__image").src = card.link;

  addCardListeners(element);

  elementList.append(element);
  checkMesto();
}

// Модальное окно места
function openPopupMesto() {
  popupMesto.classList.add("popup_opened");
}
addButton.addEventListener("click", openPopupMesto);

function closePopupMesto() {
  popupMesto.classList.remove("popup_opened");
  nameMesto.value = "";
  srcMesto.value = "";
}
closeButtonMesto.addEventListener("click", closePopupMesto);

function formSubmitMesto(evt) {
  evt.preventDefault();
  const element = elementTemplate.content.cloneNode(true);
  element.querySelector(".element__title").textContent = nameMesto.value;
  element.querySelector(".element__image").src = srcMesto.value;
  addCardListeners(element);

  elementList.prepend(element);
  popupMesto.classList.remove("popup_opened");
  nameMesto.value = "";
  srcMesto.value = "";
  checkMesto();
}
formMesto.addEventListener("submit", formSubmitMesto);
// слушатели элементов
function addCardListeners(element) {
  element
    .querySelector(".element__delete")
    .addEventListener("click", deleteElement);
  element.querySelector(".element__like").addEventListener("click", likeMesto);
  element.querySelector(".element__image").addEventListener("click", openPhoto); //реализация попап картинки
}

function likeMesto(e) {
  e.target.classList.toggle("element__like_active"); //реализация лайков
}

function deleteElement(e) {
  const element = e.target.closest(".element");
  element.remove(); //реализация удаления
  checkMesto();
}

function checkMesto() {
  const elementPlaceholder = elementList.querySelector(".element__placeholder");
  if (elementList.querySelector(".element")) {
    elementPlaceholder.classList.add("element__placeholder_hidden");
  } else {
    elementPlaceholder.classList.remove("element__placeholder_hidden");
  }
}

// Модальное окно картинки
function openPhoto(e) {
  const element = e.target.closest(".element");

  setOpenPhoto(element);
  popupPhoto.classList.add("popup_opened");
}
function setOpenPhoto(element) {
  const caption = element.querySelector(".element__title").textContent;
  const img = element.querySelector(".element__image").src;

  popupPhoto.querySelector(".popup__caption").textContent = caption;
  popupPhoto.querySelector(".popup__picture").src = img;
}

function closePopupPhoto() {
  popupPhoto.classList.remove("popup_opened");
}
closeButtonPhoto.addEventListener("click", closePopupPhoto);

//Старый код
function openPopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popup.classList.add("popup_opened");
}
editButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}
formElement.addEventListener("submit", formSubmitHandler);
