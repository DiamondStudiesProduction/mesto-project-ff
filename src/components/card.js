import {
  template,
  popupTypeImage,
  changeAttributeImageCard,
} from "../../scripts/index.js";
import { openPopup, closePopup } from "./modal.js";

export function createCard(
  dataCard,
  delCardCallBack,
  openImageCardCallBack,
  heartLikeCallBack
) {
  const card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = dataCard.name;
  const cardImage = card.querySelector(".card__image");
  const cardLike = card.querySelector(".card__like-button");
  cardImage.setAttribute("src", dataCard.link);
  cardImage.setAttribute("alt", dataCard.name);
  const delButton = card.querySelector(".card__delete-button");
  delButton.addEventListener("click", () => {
    delCardCallBack(card);
  });
  cardImage.addEventListener("click", (event) => {
    openImageCardCallBack(event);
  });
  cardLike.addEventListener("click", (event) => {
    heartLikeCallBack(event);
  });
  return card;
}

export function openImageCard(event) {
  changeAttributeImageCard(event);
  openPopup(popupTypeImage);
  closePopup();
}

export function delCard(element) {
  element.remove();
}

export function heartLike(event) {
  if (event.target.classList.contains("card__like-button_is-active")) {
    event.target.classList.remove("card__like-button_is-active");
  } else {
    event.target.classList.add("card__like-button_is-active");
  }
}
