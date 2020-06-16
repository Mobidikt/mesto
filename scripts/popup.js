const container = document.querySelector(".content"); //общий контейнер
const popup = document.querySelector(".popup"); // попап
const popupContainer = popup.querySelector(".popup__container"); //контейнер попап
const editButton = container.querySelector(".profile__btn_edit"); //кнопка редактирования информации
const closeButton = popupContainer.querySelector(".popup__close"); //кнопка закрытие попап
const formElement = popup.querySelector(".popup__form");
const nameInput = popupContainer.querySelector(".popup__text_name");
const jobInput = popupContainer.querySelector(".popup__text_job");
const name = container.querySelector(".profile__info_name"); //имя профиля
const job = container.querySelector(".profile__info_job"); // информация о профиле

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
