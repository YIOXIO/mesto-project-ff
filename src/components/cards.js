
import { cardTemplate } from "./consts.js";


// Создаем новый элемент карточки и заполнеем данными из объекта
function createCard(data,handleDeleteClick,handleLikeClick,openImage) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => handleDeleteClick(card));
  card.querySelector('.card__like-button').addEventListener('click', handleLikeClick);
  cardImage.addEventListener('click', () => openImage(data));
  return card;
}


export {createCard}

