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


Promise.all([getUserInfo(), getInitialCards()])
  .then(function([userData, cardData]) {

    renderUser(userData);

    cardData.forEach((card) => {
      const cardElement = createCard(userData, card
      )
    cardElements.append(cardElement)

    })
  })
  .catch(function(error) {

    console.error(error);
  });

function loadingStatus(evt, message){
  const popUpButton = evt.target.querySelector('.popup__button')
  popUpButton.textContent = message;
}

export function openImage(item) {
  openPopup(imagePopup);
  imageElement.src = item.link;
  imageElement.alt = item.name;
  imageCaption.textContent = item.name;
}


function openProfile() {
  openPopup(profilePopup);
  inputProfileName.value = profileNameElement.textContent;
  inputProfileDescription.value = profileDescriptionElement.textContent;
  clearValidation(profileForm, settings)
}

function renderUser(userData) {
  profileNameElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  profileImageElement.src = userData.avatar;

}

function renderCard(userData, cardData) {
  const newCard = createCard(userData, cardData);
  cardElements.append(newCard);
}


function handleSubmitFormAddNewCard(evt) {
  evt.preventDefault();
  const cardName = inputCardName.value;
  const cardLink = inputCardUrl.value;

  loadingStatus(evt, 'Сохранение...');

  getUserInfo()
    .then(userData => {
      return postCard(cardName, cardLink)
        .then(cardData => {
          renderCard(userData, cardData);
          cardForm.reset();
          closePopup(newCardAddPopup);

        })
        .catch(error => {
          console.error('Ошибка создания новой карточки:', error);
        })
        .finally(() => {
          loadingStatus(evt, 'Сохранить')
        })
    })
    .catch(error => {
      console.error('Ошибка получения пользовательских данных:', error);
      loadingStatus(evt, 'Сохранить');
    });
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
cardForm.addEventListener("submit", handleSubmitFormAddNewCard);
profileForm.addEventListener("submit", handleSubmitFormProfileEdit);
buttonEditProfile.addEventListener("click", openProfile);


buttonAddCard.addEventListener("click", () => {
  openPopup(newCardAddPopup);
  clearValidation(avatarEditForm, settings)
});
buttonEditAvatar.addEventListener("click", () => {
  openPopup(avatarPopup);
});
buttounsClosePopup.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
