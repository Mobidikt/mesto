export class Card {
  constructor(
    card,
    elementTemplate,
    cardSelector,
    handleCardClick,
    checkAmountOfCards
  ) {
    this._link = card.link;
    this._name = card.name;
    this._template = elementTemplate;
    this._cardSelector = cardSelector;
    this._isLiked = false;
    this._open = handleCardClick;
    this._check = checkAmountOfCards;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._template)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
    return card;
  }

  _openPhoto() {
    this._open({ link: this._link, name: this._name });
  }

  _handleLike() {
    this._isLiked = !this._isLiked;
    this._likeButton.classList.toggle("card__btn-like_active"); //реализация лайков
  }
  _deleteCard() {
    this._card.remove(); //реализация удаления
    this._check();
  }
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._deleteCard());
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._image.addEventListener("click", () => this._openPhoto()); //реализация попап картинки
  }
  createCard() {
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector(".card__btn-like");
    this._likeNumber = this._card.querySelector(".card__number-likes");
    this._deleteButton = this._card.querySelector(".card__btn-delete");
    this._image = this._card.querySelector(".card__image");
    this._setEventListeners();
    this._card.querySelector(".card__title").textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    return this._card;
  }
}
