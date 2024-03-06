// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Темплейт карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
const template = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function addCard(dataCard, delCardCallBack) {
  const card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = dataCard.name;
  const CardImage = card.querySelector(".card__image");
  CardImage.setAttribute("src", dataCard.link);
  CardImage.setAttribute("alt", dataCard.name);
  const delButton = card.querySelector(".card__delete-button");
  delButton.addEventListener("click", () => {
    delCardCallBack(card);
  });
  return card;
}

function delCard(element) {
  element.remove();
}

function renderCard(element, elem) {
  element.append(elem);
}

initialCards.forEach((element) => {
  const addCardReturn = addCard(element, delCard);
  renderCard(placesList, addCardReturn);
});
