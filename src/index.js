import "./pages/index.css";
import {
  createCard,
  handleDeleteClick,
  handleLikeClick

} from "./components/cards.js";
import { openPopup, closePopup } from "./components/modal.js";
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
  cardForm,
  buttonEditAvatar,
  avatarEditForm,
  avatarPopup,
  inputAvatarUrl,
  profileImageElement,
  validationSettings
} from "./components/consts.js";
import {
  getUserInfo,
  getInitialCards,
  patchProfile,
  postCard,
  patchAvatar
} from "./components/api.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { handleSubmit } from "./utils/handleSubmit.js";



enableValidation(validationSettings);

let userId

Promise.all([getUserInfo(), getInitialCards()])
  .then(function([userData, cardData]) {
    renderUser(userData);
    userId = userData._id
    
    cardData.forEach((card) => {
      const cardElement = createCard(userId, card, handleDeleteClick, handleLikeClick, handleImageClick
      )
    cardElements.prepend(cardElement)

    })
  })
  .catch(function(error) {

    console.error(error);
  });


export function handleImageClick(item) {
  openPopup(imagePopup);
  imageElement.src = item.link;
  imageElement.alt = item.name;
  imageCaption.textContent = item.name;
}


function openProfile() {
  clearValidation(profileForm, validationSettings)
  openPopup(profilePopup);
  inputProfileName.value = profileNameElement.textContent;
  inputProfileDescription.value = profileDescriptionElement.textContent;

}

function renderUser(userData) {
  profileNameElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  profileImageElement.src = userData.avatar;
}

function renderCard(userId, cardData) {
  const newCard = createCard(userId, cardData, handleDeleteClick, handleLikeClick, handleImageClick );
  cardElements.prepend(newCard);
}



function handleSubmitFormAddNewCard(evt) {
    function makeRequest(){
      return postCard(inputCardName.value, inputCardUrl.value)
      .then((card) => {
        renderCard(userId, card);
        closePopup(newCardAddPopup)
      })
  }
  handleSubmit(makeRequest,evt)
}

function handleSubmitFormProfileEdit(evt){
  function makeRequest(){
    return patchProfile(inputProfileName.value, inputProfileDescription.value)
    .then((userData) => {
      profileNameElement.textContent = userData.name;
      profileDescriptionElement.textContent = userData.about
      closePopup(profilePopup)
    })
  }
  handleSubmit(makeRequest, evt)
}

function handleSubmitFormProfileImage(evt){
  function makeRequest(){
    return patchAvatar(inputAvatarUrl.value)
    .then((userData) => {
      profileImageElement.src = userData.avatar
      closePopup(avatarPopup)
    })
  }
  handleSubmit(makeRequest, evt)
}









avatarEditForm.addEventListener('submit', handleSubmitFormProfileImage)
cardForm.addEventListener("submit", handleSubmitFormAddNewCard);
profileForm.addEventListener("submit", handleSubmitFormProfileEdit);
buttonEditProfile.addEventListener("click", openProfile);


buttonAddCard.addEventListener("click", () => {
  clearValidation(cardForm, validationSettings)
  openPopup(newCardAddPopup);
});
buttonEditAvatar.addEventListener("click", () => {
  clearValidation(avatarEditForm, validationSettings)
  openPopup(avatarPopup);
});
buttounsClosePopup.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
