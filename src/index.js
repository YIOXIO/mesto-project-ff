import './pages/index.css';
import {createCard} from './components/cards.js';
import { openProfile } from './components/modal.js';
import { closePopup } from './components/utils.js';
import { editProfileButton, closePopupButtons, addNewCardPopup, addCardButton } from './components/consts.js';
import { openPopup } from './components/utils.js';


editProfileButton.addEventListener('click', openProfile)

addCardButton.addEventListener('click', () => {
    openPopup(addNewCardPopup);
});

closePopupButtons.forEach((button) => {
    const popup = button.closest('.popup'); 
    button.addEventListener('click', () => closePopup(popup))
})
