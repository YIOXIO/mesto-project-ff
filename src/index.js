import './pages/index.css';
import {initialCards} from './scripts/cards.js'

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardElements = document.querySelector('.places__list');

// Создаем новый элемент карточки и заполнеем данными из объекта
function createCard(data) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__image').src = data.link;
    card.querySelector('.card__image').alt = data.name;
    card.querySelector('.card__title').textContent = data.name;
    card.querySelector('.card__delete-button').addEventListener('click', handleDeleteCard)
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
function handleDeleteCard(evt) {
    evt.target.closest('.card').remove()
};
