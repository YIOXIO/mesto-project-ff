import { deleteCard, likeCard } from "./api.js";
import { cardTemplate } from "./consts.js";

// Создаем новый элемент карточки и заполнеем данными из объекта
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

  card.querySelector('.card__like-button').addEventListener('click', () => handleLikeClick(data._id, likeButton, likeCounter));
  cardImage.addEventListener('click', () => openImage(data));

if (userId = data.owner._id){
  deleteButton.style.display = 'none'
}else{
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
    const response = await likeCard(cardId, isLiked);
    likeButton.classList.toggle('card__like-button_is-active');
    likeCounter.textContent = response.likes.length; 
  } catch (error) {
    console.log(`Что-то пошло не так при постановке лайка: ${error}`);
  }
}


export {handleDeleteClick, handleLikeClick, createCard}