export function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopup);
}

export function removePopup(selector, element) {
  selector.classList.remove(element);
}

function removePopupIsOpened() {
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
}

function closePopupButton(event) {
  event.target.closest(".popup").classList.remove("popup_is-opened");
}

function closePopupKeyboard() {
  removePopupIsOpened();
}

function closeOverlay() {
  removePopupIsOpened();
}

export function addListinerClosePopup() {
  document.addEventListener("click", closePopup);
}

function removeListenerClosePopup() {
  document.removeEventListener("click", closePopup);
  document.removeEventListener("keydown", closePopup);
}

function closePopup(event) {
  const elememt = event.target;

  if (elememt.classList.contains("popup")) {
    closeOverlay();
    removeListenerClosePopup();
  }

  if (elememt.classList.contains("popup__close")) {
    closePopupButton(event);
    removeListenerClosePopup();
  }

  if (event.key === "Escape") {
    closePopupKeyboard();
    removeListenerClosePopup();
  }
}
