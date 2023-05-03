const BASE_URL = 'https://auth.nomoreparties.co';

const getResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const register = async ({ password, email }) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  });
  return getResponse(res);
};

export const authorize = async ({ password, email }) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  });
  return getResponse(res);
};

export const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return getResponse(res);
};
