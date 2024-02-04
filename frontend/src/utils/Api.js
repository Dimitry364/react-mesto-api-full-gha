class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialData() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }

  getUser() {
    return this._request(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._getHeaders(),
    });
  }

  setUser({ name, about }) {
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  updateAvatar(data) {
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatarSrc,
      }),
    });
  }

  addCard({ name, link }) {
    return this._request(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  likeCard(cardId, isLiked) {
    return this._request(this._baseUrl + `/cards/${cardId}/likes/`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    });
  }

  deleteCard(data) {
    return this._request(this._baseUrl + `/cards/${data._id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
  }

  getInitialCards() {
    return this._request(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._getHeaders(),
    });
  }

  _getHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
      ...this._headers,
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://api.yarushkin.practicum.nomoredomainsmonster.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
