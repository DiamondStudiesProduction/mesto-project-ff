import { removeEventListener, changeValues } from "../../scripts/index.js";

export function openPopup(element) {
  element.classList.add("popup_is-opened");
}

export function removePopup(selector, element) {
  selector.classList.remove(element);
}

function closePopupButton(event) {
  event.target.closest(".popup").classList.remove("popup_is-opened");
  changeValues();
}

function closePopupKeyboard() {
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
  changeValues();
}

function closeOverlay() {
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
  changeValues();
}

export function closePopup() {
  document.addEventListener("click", closePopupCallBack);
  document.addEventListener("keydown", closePopupCallBack);
}

function removeListenerFunctionClosePopup() {
  removeEventListener("click", closePopupCallBack);
  removeEventListener("keydown", closePopupCallBack);
}

function closePopupCallBack(event) {
  const elememt = event.target;

  if (elememt.classList.contains("popup")) {
    closeOverlay();
    removeListenerFunctionClosePopup();
  }

  if (elememt.classList.contains("popup__close")) {
    closePopupButton(event);
    removeListenerFunctionClosePopup();
  }

  if (event.key === "Escape") {
    closePopupKeyboard();
    removeListenerFunctionClosePopup();
  }
}
