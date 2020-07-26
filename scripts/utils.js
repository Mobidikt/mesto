import {
  noCardsPlaceholder,
  elementList,
  popupMesto,
  nameMesto,
  srcMesto,
  popupPhoto,
  popupCaption,
  popupPicture,
} from "./constants.js";
import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";

export function checkMesto() {
  if (elementList.firstElementChild) {
    noCardsPlaceholder.classList.add("place__placeholder_hidden");
  } else {
    noCardsPlaceholder.classList.remove("place__placeholder_hidden");
  }
}

export function closeEsc(e) {
  if (e.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

export function mouseClick(e) {
  if (e.target.classList.contains("popup")) {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
  document.addEventListener("click", mouseClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
  document.removeEventListener("click", mouseClick);
}
export function formSubmitMesto(e) {
  e.preventDefault();
  const newCard = {
    name: nameMesto.value,
    link: srcMesto.value,
  };
  addCard(newCard, ".element-template", ".card");
  closePopup(popupMesto);
  checkMesto(); // при удалении всех карточек и добавление первой новой, необходимо спрятать элемент
}
export function setOpenPhoto(img) {
  openPopup(popupPhoto);
  popupCaption.textContent = img.name;
  popupPicture.src = img.link;
}

export function addCard(item, elementTemplate, cardSelector) {
  const card = new Card(item, elementTemplate, cardSelector);
  const cardElement = card.createCard();
  elementList.prepend(cardElement);
}

export function init() {
  initialCards.reverse().forEach((item) => {
    addCard(item, ".element-template", ".card");
  });
  // Проверяем наличие карточек на странице (пустой ли массив)
  checkMesto();
}
