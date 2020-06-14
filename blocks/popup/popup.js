let container = document.querySelector(".content"); //общий контейнер
let popup = document.querySelector(".popup"); // попап
let popupContainer = popup.querySelector(".popup__container"); //контейнер попап
let editButton = container.querySelector(".profile-info__btn_edit"); //кнопка редактирования информации
let closeButton = popupContainer.querySelector(".popup__btn_close"); //кнопка закрытие попап
let formElement = popup.querySelector(".popup__form");
let nameInput = popupContainer.querySelector(".popup__text_name");
let jobInput = popupContainer.querySelector(".popup__text_job");
let name = container.querySelector(".profile-info__name"); //имя профиля
let job = container.querySelector(".profile-info__job"); // информация о профиле

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
