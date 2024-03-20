function openPopup(popup){
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handleOverlayClosePopup);
  document.addEventListener('keydown', handleEscClosePopup);
}

function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', handleOverlayClosePopup);
  document.removeEventListener('keydown', handleEscClosePopup);
}

function handleOverlayClosePopup(evt){
  if(evt.target === evt.currentTarget){
      closePopup(evt.target)
  }
}

function handleEscClosePopup(evt){
  if(evt.key === 'Escape'){
      closePopup(document.querySelector('.popup_is-opened'));
  }
}

export {openPopup, closePopup};

