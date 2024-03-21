export function renderLoading(isLoading, button, buttonText ='Сохаранить', loadingText='Сохранение...'){
    if( isLoading){
      button.textContent = loadingText
    }else{
      button.textContent = buttonText
    }
  }
  