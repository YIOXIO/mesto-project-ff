import "./pages/index.css";
import {
  createCard,
  handleDeleteClick,
  handleLikeClick,
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
} from "./components/consts.js";
import {
  getUserInfo,
  getInitialCards,
  patchProfile,
  postCard
} from "./components/api.js";
import { enableValidation } from "./components/validation.js";

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSubmitSelector: ".popup__button",
  buttonInActiveClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

getInitialCards()
.then((dataCards) => {
  dataCards.forEach(renderCard)
});

getUserInfo()
  .then((res) => {
    profileNameElement.textContent = res.name;
    profileDescriptionElement.textContent = res.about;
  })
  .catch((error) => {
    return Promise.reject(error.message);
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

async function handleSubmitFormProfileEdit(evt) {
  evt.preventDefault();

  const profileNameApi = inputProfileName.value;
  const profileAboutApi = inputProfileDescription.value;

  try {
    const res = await patchProfile(profileNameApi, profileAboutApi);
    profileNameElement.textContent = res.name;
    profileDescriptionElement.textContent = res.about;

    closePopup(profilePopup);
  } catch (error) {
    console.log(`Что - то пошло не так: ${error}`);
  }

}

function renderCard(data) {
  cardElements.prepend(
    createCard(data, handleDeleteClick, handleLikeClick, openImage)
  );
}

async function handleSubmitFormAddNewCard(evt) {
  evt.preventDefault();
  const newCard = {};
  const cardNameApi = inputCardName.value
  const cardUrlApi = inputCardUrl.value
  try {
    const res = await postCard(cardNameApi, cardUrlApi)
    newCard.name = res.name;
    newCard.link = res.link;
  renderCard(newCard);
  closePopup(newCardAddPopup);
  evt.target.reset();
  }catch(error){
    console.log(`Что - то пошло не так: ${error}`);

  }

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
