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
const elementList = document.querySelector(".place__list");
const noCardsPlaceholder = container.querySelector(".card__placeholder");
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
  element.querySelector(".card__title").textContent = card.name;
  element.querySelector(".card__image").src = card.link;
  element.querySelector(".card__image").alt = card.name;
  return element;
}

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}
closeButton.addEventListener("click", () => togglePopup(popup));
addButton.addEventListener("click", () => togglePopup(popupMesto));

function checkMesto() {
  if (elementList.firstElementChild) {
    noCardsPlaceholder.classList.add("card__placeholder_hidden");
  } else {
    noCardsPlaceholder.classList.remove("card__placeholder_hidden");
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
  togglePopup(popupPhoto);
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
  elementList.append(cardElement);
}

// Модальное окно места
function closePopupMesto() {
  togglePopup(popupMesto);
  nameMesto.value = "";
  srcMesto.value = "";
}
closeButtonMesto.addEventListener("click", closePopupMesto);

function formSubmitMesto(evt) {
  evt.preventDefault();
  const newCard = {
    name: nameMesto.value,
    link: srcMesto.value,
  };
  const cardElement = createCard(newCard);
  addCardListeners(cardElement);
  elementList.prepend(cardElement); // разные методы добавления
  closePopupMesto();
  checkMesto(); // при удалении всех карточек и добавление первой новой, необходимо спрятать элемент (писать код от части функции? который спрячет элемент)
}
formMesto.addEventListener("submit", formSubmitMesto);
// слушатели элементов

closeButtonPhoto.addEventListener("click", () => togglePopup(popupPhoto));

function openPopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  togglePopup(popup);
}
editButton.addEventListener("click", openPopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup(popup);
}
formElement.addEventListener("submit", formSubmitHandler);

function init() {
  initialCards.forEach(addCard);
  // Проверяем наличие карточек на странице (пустой ли массив)
  checkMesto();
}
init();
