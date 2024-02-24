// Переменные для шаблона карточки и элементы списка карточек
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardElements  = document.querySelector('.places__list');

// Переменны для формы редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button')
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const inputProfileName = profileForm.elements['name'];
const inputProfileDescription = profileForm.elements['description'];

// Переменные для Элементы профиля (имя и описание деятельности)
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

// Переменные для открытия изображения
const imagePopup = document.querySelector(".popup_type_image");
const imageElement = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

//Переменная для кнопки закрытия модальных окон
const buttounsClosePopup = document.querySelectorAll('.popup__close')

// Переменные для формы добавления новой карточки
const buttonAddCard = document.querySelector('.profile__add-button');
const cardForm = document.forms['new-place'];
const inputCardName = cardForm.elements['place-name'];
const inputCardUrl = cardForm.elements['link'];
const newCardAddPopup = document.querySelector('.popup_type_new-card')

export {
    cardTemplate,
    cardElements,
    profileForm,
    profilePopup,
    inputProfileDescription,
    inputProfileName,
    profileNameElement,
    profileDescriptionElement,
    imagePopup,
    imageElement,
    imageCaption,
    buttounsClosePopup,
    buttonEditProfile,
    inputCardName,
    inputCardUrl,
    newCardAddPopup,
    buttonAddCard,
    cardForm,
};