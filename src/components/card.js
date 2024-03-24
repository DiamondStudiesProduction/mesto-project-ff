import { template, placeName, link, placesList } from "../../scripts/index.js";
import { removePopup, removeAddCardValues } from "./modal.js";

export function addCard(dataCard, delCardCallBack, openImageCard, heartLike) {
  const card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = dataCard.name;
  const cardImage = card.querySelector(".card__image");
  cardImage.setAttribute("src", dataCard.link);
  cardImage.setAttribute("alt", dataCard.name);
  const delButton = card.querySelector(".card__delete-button");
  delButton.addEventListener("click", () => {
    delCardCallBack(card);
  });
  return card;
}

export function delCard(element) {
  element.remove();
}

export function renderCard(element, elem) {
  element.prepend(elem);
}

export function heartLike(event) {
  if (event.target.classList.contains("card__like-button_is-active")) {
    event.target.classList.remove("card__like-button_is-active");
  } else {
    event.target.classList.add("card__like-button_is-active");
  }
}

export function addCardFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: placeName.value,
    link: link.value,
  };
  const cardReturn = addCard(data, delCard);
  renderCard(placesList, cardReturn);
  removePopup(".popup_type_new-card", "popup_is-opened");
  removeAddCardValues();
}
