function openPopup(evt){
  evt.classList.add('popup_is-opened');
  evt.addEventListener('click', handleOverlayClosePopup);
  document.addEventListener('keydown', handleEscClosePopup);
}

function closePopup(evt){
  evt.classList.remove('popup_is-opened');
  evt.removeEventListener('click', handleOverlayClosePopup);
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

