import "./pages/index.css";
import {
  createCard,

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
  profileImageElement
} from "./components/consts.js";
import {
  getUserInfo,
  getInitialCards,
  patchProfile,
  postCard,
  patchAvatar
} from "./components/api.js";
import { enableValidation, clearValidation } from "./components/validation.js";


const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSubmitSelector: ".popup__button",
  buttonInActiveClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
}
enableValidation(settings);

function loadingStatus(evt, message){
  const popUpButton = evt.target.querySelector('.popup__button')
  popUpButton.textContent = message;
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(function([userData, cardData]) {

    renderUser(userData);
    renderCard(userData, cardData)
  })
  .catch(function(error) {

    console.error(error);
  });




  function renderCard(userId, cardsData) {
  cardsData.forEach(cardData => {
    const card = createCard(userId, cardData);
    cardElements.appendChild(card);
  });
}

function renderUser(userData) {
  profileNameElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  profileImageElement.src = userData.avatar;

}


export function openImage(item) {
  openPopup(imagePopup);
  imageElement.src = item.link;
  imageElement.alt = item.name;
  imageCaption.textContent = item.name;
}



function handleSubmitFormAddNewCard(evt) {
  evt.preventDefault();
  const CardName = inputCardName.value;
  const CardLink = inputCardUrl.value;
  loadingStatus(evt, 'Сохранение...')

  // Отправляем запрос на сервер
  postCard(CardName, CardLink)
    .then(card => {
      renderCard(card);
      cardForm.reset()
    })
    .catch(error => {
      console.error('Ошибка добавления новой карточки:', error);
    })
    .finally(() => {
      loadingStatus(evt, 'Сохранить')
      closePopup(newCardAddPopup)

    })
}


















































function handleSubmitFormProfileEdit(evt) {
  evt.preventDefault();

  const profileNameApi = inputProfileName.value;
  const profileAboutApi = inputProfileDescription.value;
  loadingStatus(evt, 'Сохранение...');

  return patchProfile(profileNameApi, profileAboutApi) 
    .then((res) => {
      profileNameElement.textContent = res.name; 
      profileDescriptionElement.textContent = res.about;
      profileForm.reset()
      closePopup(profilePopup);
    })
    .catch((error) => {
      console.log(`Что-то пошло не так: ${error}`);
    })
    .finally(() => {
      loadingStatus(evt, 'Сохранить');
    });
}

function handleSubmitFormProfileImage(evt){
  evt.preventDefault()
  const porfileImageApi = inputAvatarUrl.value;
  loadingStatus(evt, 'Сохранение...');
  return patchAvatar(porfileImageApi)
  .then((res) => {
    profileImageElement.src = res.avatar
    avatarEditForm.reset()
    closePopup(avatarPopup)
  })
  .catch((error) => {
    console.log(`Что-то пошло не так: ${error}`);
  })
  .finally(() => {
    loadingStatus(evt, 'Сохранить');
  })
  
}





avatarEditForm.addEventListener('submit', handleSubmitFormProfileImage)






































function openProfile() {
  openPopup(profilePopup);
  inputProfileName.value = profileNameElement.textContent;
  inputProfileDescription.value = profileDescriptionElement.textContent;
}








cardForm.addEventListener("submit", handleSubmitFormAddNewCard);
profileForm.addEventListener("submit", handleSubmitFormProfileEdit);
buttonEditProfile.addEventListener("click", openProfile);


buttonAddCard.addEventListener("click", () => {
  openPopup(newCardAddPopup);
});
buttonEditAvatar.addEventListener("click", () => {
  openPopup(avatarPopup);
});
buttounsClosePopup.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
