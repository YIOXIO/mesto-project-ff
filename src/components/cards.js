import { deleteCard, likeCard, deleteLike } from "./api.js";
import { cardTemplate } from "./consts.js";


function createCard(data, userId, handleDeleteClick, handleLikeClick, openImage) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeCounter = card.querySelector('.card__likes-counter');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');

  card.dataset.id = data._id;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeCounter.textContent = data.likes.length;

  const cardId = data._id;

  card.querySelector('.card__like-button').addEventListener('click', (event) => {
    event.preventDefault(); 
    handleLikeClick(data._id, likeButton, likeCounter);
  });
  cardImage.addEventListener('click', () => openImage(data));

if (userId !== data.owner._id){
  deleteButton.style.display = 'none'
}else{
  deleteButton.style.display = 'block'
  deleteButton.addEventListener('click', () => {
    handleDeleteClick(cardId, card)
  })
}

  return card;
}



async function handleDeleteClick(card, cardId) {
  try {
    await deleteCard(cardId);
    card.remove();
  } catch (error) {
    console.log(`Что-то пошло не так при удалении карточки: ${error}`);
  }
}

async function handleLikeClick(cardId, likeButton, likeCounter) {
  try {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    
    if (isLiked) {
      const response = await deleteLike(cardId);
      likeButton.classList.remove('card__like-button_is-active');
      likeCounter.textContent = response.likes.length; 
    } else {
      // Поставить лайк
      const response = await likeCard(cardId, isLiked);
      likeButton.classList.add('card__like-button_is-active');
      likeCounter.textContent = response.likes.length; 
    }
  } catch (error) {
    console.log(`Что-то пошло не так при постановке лайка: ${error}`);
  }
}

export {handleDeleteClick, handleLikeClick, createCard}