import {
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
  placeName,
  link,
} from "../../scripts/index.js";

export function openImageCard(event) {
  const cardImageSrc = event.target.getAttribute("src");
  document.querySelector(".popup__image").setAttribute("src", cardImageSrc);
}

export function addPopupClass(elementClassName) {
  document.querySelector(elementClassName).classList.add("popup_is-opened");
}

function removeEventListener(event, element) {
  document.removeEventListener(event, element);
}

export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  removePopup(".popup_type_edit", "popup_is-opened");
}

export function removePopup(selector, element) {
  document.querySelector(selector).classList.remove(element);
}

export function replacePopupResetValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export function popupCloseButton() {
  document.addEventListener("click", popupCloseButtonCallBack);
}

function popupCloseButtonCallBack(event) {
  const popupCloseButton = event.target;
  if (popupCloseButton.classList.contains("popup__close")) {
    popupCloseButton.closest(".popup").classList.remove("popup_is-opened");
    removeEventListener("click", popupCloseButtonCallBack);
    removeEventListener("keydown", popupCloseKeyboardCallBack);
    replacePopupResetValues();
    removeAddCardValues();
  }
}

export function popupCloseKeyboard() {
  document.addEventListener("keydown", popupCloseKeyboardCallBack);
}

function popupCloseKeyboardCallBack(event) {
  if (event.key === "Escape") {
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
    removeEventListener("keydown", popupCloseKeyboardCallBack);
    replacePopupResetValues();
    removeAddCardValues();
  }
}

export function overlay() {
  document.addEventListener("click", overlayCallBack);
}

function overlayCallBack(event) {
  const popup = event.target.classList.contains("popup");
  if (popup) {
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
    removeEventListener("click", overlayCallBack);
    removeEventListener("keydown", popupCloseKeyboardCallBack);
    replacePopupResetValues();
    removeAddCardValues();
  }
}

export function removeAddCardValues() {
  placeName.value = "";
  link.value = "";
}
