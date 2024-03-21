function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

function inactiveButton(buttonElement, settings) {
    buttonElement.classList.add(settings.buttonInActiveClass);
    buttonElement.disabled = true;
}


function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

function toggleButtonState(inputList, buttonElement, settings) {
    const hasInvalid = hasInvalidInput(inputList);

    buttonElement.classList.toggle(settings.buttonInActiveClass, hasInvalid);
    buttonElement.disabled = hasInvalid;
};

function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.buttonSubmitSelector);
    toggleButtonState(inputList, buttonElement, settings);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });

    formElement.addEventListener('reset', () => {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, settings);
        });
        inactiveButton(buttonElement, settings);
    });
};

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => evt.preventDefault());
        setEventListeners(formElement, settings);
    });
};
function clearValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.buttonSubmitSelector);

    inputList.forEach((inputElement) => {
        inputElement.value = '';
        hideInputError(formElement, inputElement, settings);
    });

    inactiveButton(buttonElement, settings);
}

export { enableValidation,clearValidation };



