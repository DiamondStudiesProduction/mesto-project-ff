import { initialCards } from "./cards.js";
import {
  createCard,
  delCard,
  heartLike,
  openImageCard,
} from "../src/components/card.js";
import { openPopup, closePopup, removePopup } from "../src/components/modal.js";
export const template = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");
const editProfileForm = document.forms["edit-profile"];
export const nameInput = editProfileForm.elements.name;
export const jobInput = editProfileForm.elements.description;
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
const formNewPlace = document.forms["new-place"];
export const placeName = formNewPlace.elements["place-name"];
export const link = formNewPlace.elements.link;
const pageContent = document.querySelector(".page__content");
const popupList = document.querySelectorAll(".popup");
export const popupTypeEdit = pageContent.querySelector(".popup_type_edit");
export const popupTypeImage = pageContent.querySelector(".popup_type_image");
const popupTypeNewCard = pageContent.querySelector(".popup_type_new-card");

initialCards.forEach((element) => {
  const createCardReturn = createCard(
    element,
    delCard,
    openImageCard,
    heartLike
  );
  renderCard(placesList, createCardReturn);
});

popupList.forEach((elem) => {
  elem.classList.add("popup_is-animated");
});

editProfileForm.addEventListener("submit", editProfileFormSubmit);
formNewPlace.addEventListener("submit", addCardFormSubmit);

replacePopupResetValues();

function renderCard(element, elem) {
  element.prepend(elem);
}

export function removeEventListener(event, element) {
  document.removeEventListener(event, element);
}

export function changeAttributeImageCard(event) {
  const cardImageSrc = event.target.getAttribute("src");
  document.querySelector(".popup__image").setAttribute("src", cardImageSrc);
}

export function replacePopupResetValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function removeAddCardValues() {
  placeName.value = "";
  link.value = "";
}

export function changeValues() {
  replacePopupResetValues();
  removeAddCardValues();
}

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: placeName.value,
    link: link.value,
  };
  const cardReturn = createCard(data, delCard, openImageCard, heartLike);
  renderCard(placesList, cardReturn);
  removePopup(popupTypeNewCard, "popup_is-opened");
  removeAddCardValues();
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  removePopup(popupTypeEdit, "popup_is-opened");
}

pageContent
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openPopup(popupTypeEdit);
    closePopup();
  });

pageContent
  .querySelector(".profile__add-button")
  .addEventListener("click", () => {
    openPopup(popupTypeNewCard);
    closePopup();
  });
