const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
        authorization: '91dc1494-9a55-417d-bc4e-2ada7cf45078',
        'Content-type': 'application/json'
      }
}




export function getUserInfo(){
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
  })
  .then(res => {
      if(res.ok){
          return res.json(); 
      } else {
          throw new Error(`Ошибка получения данных о пользователи: ${res.status}`);
      }
  })
  .catch(error => {
      console.log(error);
      return Promise.reject(error.message);
  });
}


export function getInitialCards(){
  return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
  })
  .then(res => {
      if(res.ok){
          return res.json(); 
      } else {
          throw new Error(`Ошибка инициализации карт: ${res.status}`);
      }
  })
  .catch(error => {
      console.log(error);
      return Promise.reject(error.message);
  });
}


export function patchProfile(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          about: about,
      })
  })
  .then(res => {
      if (res.ok){
          return res.json();
      } else {
          throw new Error(`Ошибка редактирования профиля: ${res.status}`);
      }
  })
  .catch(error => {
      console.log(error);
      return Promise.reject(error.message);
  });
}

export function patchAvatar(avatar){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: avatar
      })
  })
  .then(res => {
      if (res.ok){
          return res.json();
      } else {
          throw new Error(`Ошибка редактирования профиля: ${res.status}`);
      }
  })
  .catch(error => {
      console.log(error);
      return Promise.reject(error.message);
  });
}

export function postCard(name, link){
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          link: link,
      })
  })
  .then(res => {
      if (res.ok){
          return res.json();
      } else {
          throw new Error(`Ошибка добавления карточки: ${res.status}`);
      }
  })
  .catch(error => {
      console.log(error);
      return Promise.reject(error.message);
  });
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, { 
      method: 'DELETE',
      headers: config.headers,
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          throw new Error(`Ошибка удаления карточки: ${res.status}`);
      }
  })
  .catch(error => {
      console.log(error);
      return Promise.reject(error.message);
  });
}

export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          throw new Error(`Ошибка постановки лайка: ${res.status}`);
      }
  })
  .catch(error => {
      console.log(error);
      return Promise.reject(error.message);
  });
}


export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          throw new Error(`Ошибка удаления лайка: ${res.status}`);
      }
  })
  .catch(error => {
      console.log(error);
      return Promise.reject(error.message);
  });
}