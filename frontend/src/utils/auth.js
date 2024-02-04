export const BASE_URL = "https://api.yarushkin.practicum.nomoredomainsmonster.ru";

function checkResponse(res) {
  if (res.ok) return res.json();

  return Promise.reject(`Ошибка: ${res.status}`);
}

export function registerUser({email, password}) {
    console.log(email);
    console.log(password);
    console.log(JSON.stringify({ email, password }));
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function loginUser({email, password}) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}
