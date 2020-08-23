export class Card {
  constructor({
    card,
    cardTemplate,
    handleCardClick,
    api,
    userId,
    handleCardDelete,
  }) {
    this._link = card.link;
    this._name = card.name;
    this._id = card._id;
    this._like = card.likes;
    this._template = cardTemplate;
    this._open = handleCardClick;
    this._api = api;
    this._userId = userId;
    this._initUserId = card.owner._id;
    this._delete = handleCardDelete;
  }

  _getTemplate() {
    return this._template.cloneNode(true);
  }

  _openPhoto() {
    this._open({ link: this._link, name: this._name });
  }
  _likeToggleActive() {
    this._likeButton.classList.toggle("card__btn-like_active");
  }
  _handleLike() {
    if (!this._likeButton.classList.contains("card__btn-like_active")) {
      this._api
        .createLike(this._id)
        .then((item) => {
          this._countLikes.textContent = item.likes.length;
          this._likeToggleActive();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .deleteLike(this._id)
        .then((item) => {
          this._countLikes.textContent = item.likes.length;
          this._likeToggleActive();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _deleteCard() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  _deleteIcon() {
    if (this._initUserId === this._userId) {
      this._deleteButton.classList.remove("card__btn-delete_invis");
      this._deleteButton.addEventListener("click", () => this._handleDelete());
    }
  }
  _handleDelete() {
    this._delete(this._deleteCard.bind(this));
  }
  _likes() {
    this._like.forEach((item) => {
      if (item._id === this._userId) {
        this._likeButton.classList.add("card__btn-like_active");
      }
    });
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._image.addEventListener("click", () => this._openPhoto()); //реализация попап картинки
  }
  createCard() {
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector(".card__btn-like");
    this._deleteButton = this._card.querySelector(".card__btn-delete");
    this._image = this._card.querySelector(".card__image");
    this._countLikes = this._card.querySelector(".card__number-likes");
    this._setEventListeners();
    this._likes();
    this._deleteIcon();
    this._card.querySelector(".card__title").textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._countLikes.textContent = this._like.length;

    return this._card;
  }
}
