// Переменные для шаблона карточки и элементы списка карточек
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardElements  = document.querySelector('.places__list');

// Переменны для формы редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const inputProfileName = editProfileForm.elements['name'];
const inputProfileDescription = editProfileForm.elements['description'];

// Переменные для Элементы профиля (имя и описание деятельности)
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

// Переменные для открытия изображения
const imagePopup = document.querySelector(".popup_type_image");
const imageElement = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

//Переменная для кнопки закрытия модальных окон
const closePopupButtons = document.querySelectorAll('.popup__close')

// Переменные для формы добавления новой карточки
const addCardButton = document.querySelector('.profile__add-button');
const cardForm = document.forms['new-place'];
const inputCardName = cardForm.elements['place-name'];
const inputCardUrl = cardForm.elements['link'];
const addNewCardPopup = document.querySelector('.popup_type_new-card')

export {
    cardTemplate,
    cardElements,
    editProfileForm,
    editProfilePopup,
    inputProfileDescription,
    inputProfileName,
    profileNameElement,
    profileDescriptionElement,
    imagePopup,
    imageElement,
    imageCaption,
    closePopupButtons,
    editProfileButton,
    inputCardName,
    inputCardUrl,
    addNewCardPopup,
    addCardButton,
    cardForm,
};