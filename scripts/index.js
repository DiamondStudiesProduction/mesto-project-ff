import { initialCards } from "./cards.js";
import {
  addCard,
  delCard,
  renderCard,
  heartLike,
  addCardFormSubmit,
} from "../src/components/card.js";
import {
  openImageCard,
  addPopupClass,
  handleFormSubmit,
  replacePopupResetValues,
  popupCloseButton,
  popupCloseKeyboard,
  overlay,
} from "../src/components/modal.js";
export const template = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

const formElement = document.forms["edit-profile"];
export const nameInput = formElement.elements.name;
export const jobInput = formElement.elements.description;
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

const formNewPlace = document.forms["new-place"];
export const placeName = formNewPlace.elements["place-name"];
export const link = formNewPlace.elements.link;

const pageContent = document.querySelector(".page__content");
const popupList = document.querySelectorAll(".popup");

initialCards.forEach((element) => {
  const addCardReturn = addCard(element, delCard);
  renderCard(placesList, addCardReturn);
});

popupList.forEach((elem) => {
  elem.classList.add("popup_is-animated");
});

formElement.addEventListener("submit", handleFormSubmit);
formNewPlace.addEventListener("submit", addCardFormSubmit);

replacePopupResetValues();

pageContent
  .querySelector(".profile__edit-button")
  .addEventListener("click", (event) => {
    addPopupClass(".popup_type_edit");
    overlay();
    popupCloseButton();
    popupCloseKeyboard();
  });

pageContent
  .querySelector(".profile__add-button")
  .addEventListener("click", (event) => {
    addPopupClass(".popup_type_new-card");
    overlay();
    popupCloseButton();
    popupCloseKeyboard();
  });

pageContent
  .querySelector(".places__list")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("card__image")) {
      openImageCard(event);
      addPopupClass(".popup_type_image");
      overlay();
      popupCloseButton();
      popupCloseKeyboard();
    }

    if (event.target.classList.contains("card__like-button")) {
      heartLike(event);
    }
  });
