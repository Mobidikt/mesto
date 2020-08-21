export class Api {
  constructor({ serverUrl, authorization }) {
    this._serverUrl = serverUrl;
    this._authorization = authorization;
  }

  _fetch(url, params) {
    return fetch(this._serverUrl + url, params).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getInitialUserInfo() {
    return this._fetch("/users/me", {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    });
  }
  //редактирование информации профиля
  editUserInfo(info) {
    return this._fetch("/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    });
  }
  //редактирование информации профиля
  editUserAvatar(info) {
    return this._fetch("/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: info,
      }),
    });
  }
  //добавление карточки
  getInitialCards() {
    return this._fetch("/cards", {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    });
  }
  createCard(info) {
    return this._fetch("/cards", {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: info.name,
        link: info.link,
      }),
    });
  }
  //удаление карточки
  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    });
  }
  //  Реализация лайка
  createLike(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    });
  }
  deleteLike(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    });
  }
}
