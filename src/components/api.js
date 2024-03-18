export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
        authorization: '91dc1494-9a55-417d-bc4e-2ada7cf45078',
        'Content-type': 'application/json'
      }
}

export async function getUserInfo(){
    try {
        const res = await fetch(`${config.baseUrl}/users/me`, {
            method: 'GET',
            headers: config.headers
        });

        if(res.ok){
            return res.json(); 
        } else {
            throw new Error(`Ошибка получения данных о пользователи: ${res.status}`);
        }
    } catch(error) {
        console.log(error);
        return Promise.reject(error.message);
    }
}

export async function getInitialCards(){
    try {
        const res = await fetch(`${config.baseUrl}/cards`, {
            method: 'GET',
            headers: config.headers
        });

        if(res.ok){
            return res.json(); 
        } else {
            throw new Error(`Ошибка инициализации карт: ${res.status}`);
        }
    } catch(error) {
        console.log(error);
        return Promise.reject(error.message);
    }
}

export async function patchProfile(name, about){
    try{
        const res = await fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
            
        if (res.ok){
            return res.json()
        }else {
            throw new Error(`Ошибка редактирования профиля: ${res.status}`);
        }
    }catch(error){
        console.log(error)
        return Promise.reject(error.message);
    }
}

export async function postCard(cardName,cardUrl){
    try{
        const res = await fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: cardName,
                link: cardUrl,
            })
        });
        
        if (res.ok){
            return res.json()
        }else {
            throw new Error(`Ошибка добавления карточки: ${res.status}`);
        }
    }catch(error){
        console.log(error)
        return Promise.reject(error.message);
    }
}

export async function deleteCard(cardId) {
    try {
      const res = await fetch(`${config.baseUrl}/cards/${cardId}`, { 
        method: 'DELETE',
        headers: config.headers,
      });
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Ошибка удаления карточки: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error.message);
    }
  }
  
export async function likeCard(cardId) {
    try {
      const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
      });
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Ошибка постановки лайка: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error.message);
    }
  }
  export async function deleteLike(cardId) {
    try {
      const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
      });
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Ошибка удаления лайка: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error.message);
    }
}