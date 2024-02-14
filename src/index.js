import './pages/index.css';
import {initialCards} from './scripts/cards.js'

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardElements = document.querySelector('.places__list');

// Создаем новый элемент карточки и заполнеем данными из объекта
function createCard(data) {
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => handleDeleteCard(card));    
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
function handleDeleteCard(card) {
    card.remove()
};
