import { request } from "../utils/apiUtils.js"
import { config } from "../utils/apiConfig.js";


export function getUserInfo(){
    return request('/users/me', {
        method: 'GET',
        headers: config.headers
    });
}

export function getInitialCards(){
    return request('/cards', {
        method: 'GET',
        headers: config.headers
    });
}

export function patchProfile(name, about){
    return request('/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
    });
}

export function patchAvatar(avatar){
    return request('/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    });
}

export function postCard(name, link){
    return request('/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        })
    });
}

export function deleteCard(cardId) {
    return request(`/cards/${cardId}`, { 
        method: 'DELETE',
        headers: config.headers,
    });
}

export function likeCard(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    });
}

export function deleteLike(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    });
}