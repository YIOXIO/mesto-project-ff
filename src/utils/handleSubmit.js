import { renderLoading } from "./renderLoading";
export function handleSubmit(request, evt, loadingText='Сохранение...'){
    evt.preventDefault()
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText)
    request()
      .then(() => {
        evt.target.reset()
      })
      .catch((console.error))
      .finally(() => {
        renderLoading(false, submitButton, initialText)
      })
  }   