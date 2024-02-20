
import { initialCards } from "./cardArray.js";
import { cardTemplate, cardElements } from "./consts.js";
import { openImage } from "./modal.js";

// Создаем новый элемент карточки и заполнеем данными из объекта
function createCard(data) {
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

//Отрисовываем элемент 
function renderCard(data) {
  cardElements.prepend(createCard(data));
};

// Для каждого элемента из массива вызваевм функцию отрисовки
initialCards.forEach((data) => {
  renderCard(data);
});

// Удалить карточку 
function handleDeleteClick(evt) {
  evt.remove()
};

//Поставить лайк карточки
function handleLikeClick(evt){
  evt.target.closest('.card__like-button').classList.toggle('card__like-button_is-active');
}

export {createCard,renderCard}

