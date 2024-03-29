import { initialCards } from "./cards.js";
import { createCard, delCard, heartLike } from "../src/components/card.js";
import {
  openPopup,
  addListinerClosePopup,
  removePopup,
} from "../src/components/modal.js";
const placesList = document.querySelector(".places__list");
const formEditProfile = document.forms["edit-profile"];
const inputName = formEditProfile.elements.name;
const inputJob = formEditProfile.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formNewPlace = document.forms["new-place"];
const placeName = formNewPlace.elements["place-name"];
const link = formNewPlace.elements.link;
const pageContent = document.querySelector(".page__content");
const popupList = document.querySelectorAll(".popup");
const popupTypeEdit = pageContent.querySelector(".popup_type_edit");
const popupTypeImage = pageContent.querySelector(".popup_type_image");
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

formEditProfile.addEventListener("submit", editProfileFormSubmit);
formNewPlace.addEventListener("submit", addCardFormSubmit);

replacePopupResetValues();

function renderCard(element, elem) {
  element.prepend(elem);
}

function openImageCard(event) {
  changeAttributeImageCard(event);
  openPopup(popupTypeImage);
  addListinerClosePopup();
}

function changeAttributeImageCard(event) {
  const cardImageSrc = event.target.getAttribute("src");
  document.querySelector(".popup__image").setAttribute("src", cardImageSrc);
}

function replacePopupResetValues() {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
}

function removeAddCardValues() {
  placeName.value = "";
  link.value = "";
}

function changeInputsValues() {
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
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
  removePopup(popupTypeEdit, "popup_is-opened");
}

pageContent
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openPopup(popupTypeEdit);
    addListinerClosePopup();
    changeInputsValues();
  });

pageContent
  .querySelector(".profile__add-button")
  .addEventListener("click", () => {
    openPopup(popupTypeNewCard);
    addListinerClosePopup();
    changeInputsValues();
  });
