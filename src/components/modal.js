import { openPopup, closePopup } from "./utils";
import {
  editProfileForm,
  editProfilePopup,
  inputProfileDescription,
  inputProfileName,
  profileNameElement,
  profileDescriptionElement,
  imagePopup,
  imageElement,
  imageCaption,
  inputCardName,
  inputCardUrl,
  addNewCardPopup,
  cardForm
} from "./consts";

import {renderCard} from './cards.js'; 

function openProfile() {
  openPopup(editProfilePopup);
  inputProfileName.value = profileNameElement.textContent;
  inputProfileDescription.value = profileDescriptionElement.textContent;
}

function handleSubmitFormProfileEdit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = `${inputProfileName.value}`;
  profileDescriptionElement.textContent = `${inputProfileDescription.value}`;
  closePopup(editProfilePopup);
}

editProfileForm.addEventListener("submit", handleSubmitFormProfileEdit);

function openImage(item) {
  openPopup(imagePopup);
  imageElement.src = item.link;
  imageElement.alt = item.name;
  imageCaption.textContent = item.name;
}



function handleSubmitFormAddNewCard(evt){
    evt.preventDefault();
    const newCard = {}
    newCard.name = inputCardName.value;
    newCard.link = inputCardUrl.value;
    renderCard(newCard)
    evt.target.reset()
    closePopup(addNewCardPopup)
;}

cardForm.addEventListener('submit', handleSubmitFormAddNewCard)


export { openProfile, openImage };
