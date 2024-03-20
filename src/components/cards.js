import { deleteCard, likeCard, deleteLike } from "./api.js";
import { cardTemplate } from "./consts.js";
import { openImage } from "../index.js";


function createCard(userId, cardsData) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likesCounter = card.querySelector('.card__likes-counter');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  
  cardImage.src = cardsData.link;
  cardImage.alt = cardsData.name; 
  cardTitle.textContent = cardsData.name;
  

  if (userId._id === cardsData.owner._id) {
    deleteButton.addEventListener('click', (evt) => handleDeleteClick(evt, cardsData._id));
  } else {
    deleteButton.remove();
  }


  if (cardsData.likes && cardsData.likes.some(like => like._id === userId._id)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  likeButton.addEventListener('click', (evt) => handleLikeClick(evt, cardsData._id, likesCounter));
  likesCounter.textContent = cardsData.likes.length;
  
  cardImage.addEventListener('click', () => openImage(cardsData));
  
  return card;
}



function handleDeleteClick(evt, cardId) {
  deleteCard(cardId)
  .then(() => {evt.target.closest('.card').remove()})
  .catch((res) => console.log(res))
}


function handleLikeClick(evt, cardId, likesCounter) {
    const likeButton = evt.target;
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    const likeAction = isLiked ? deleteLike(cardId) : likeCard(cardId);

    likeAction
        .then((res) => {
            likesCounter.textContent = res.likes.length;
            if (isLiked) {
                likeButton.classList.remove('card__like-button_is-active');
            } else {
                likeButton.classList.add('card__like-button_is-active');
            }
        })
        .catch((error) => console.log(error));
}

export {createCard}


