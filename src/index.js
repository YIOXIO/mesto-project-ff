import './pages/index.css';
import { initialCards } from './components/cardArray.js';
import {createCard, handleDeleteClick, handleLikeClick} from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import {     
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
    cardForm,} from './components/consts.js';


   initialCards.forEach((data) => {
    renderCard(data);
  });
  

  function openImage(item) {
    openPopup(imagePopup);
    imageElement.src = item.link;
    imageElement.alt = item.name;
    imageCaption.textContent = item.name;
  }

function openProfile() {
    openPopup(profilePopup);
    inputProfileName.value = profileNameElement.textContent;
    inputProfileDescription.value = profileDescriptionElement.textContent;
  }
  
  function handleSubmitFormProfileEdit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = `${inputProfileName.value}`;
    profileDescriptionElement.textContent = `${inputProfileDescription.value}`;
    closePopup(profilePopup);
  }
  
  function renderCard(data) {
     cardElements.prepend(createCard(data, handleDeleteClick, handleLikeClick, openImage));
   };
  
  
   function handleSubmitFormAddNewCard(evt){
    evt.preventDefault();
    const newCard = {}
    newCard.name = inputCardName.value;
    newCard.link = inputCardUrl.value;
    renderCard(newCard)
    evt.target.reset()
    closePopup(newCardAddPopup)
;}



cardForm.addEventListener('submit', handleSubmitFormAddNewCard)
profileForm.addEventListener("submit", handleSubmitFormProfileEdit);
buttonEditProfile.addEventListener('click', openProfile)
buttonAddCard.addEventListener('click', () => {
openPopup(newCardAddPopup);
});
buttounsClosePopup.forEach((button) => {
const popup = button.closest('.popup'); 
button.addEventListener('click', () => closePopup(popup))
})
