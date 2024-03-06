// @todo: DOM узлы
const template = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(dataCard,delCardCallBack) {
  const card = template.querySelector(".card").cloneNode(true);
  // @todo: Темплейт карточки
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

// @todo: Функция удаления карточки
function delCard(element) {
  element.remove();
}

function renderCard(element, elem) {
  element.append(elem);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
 const addCardReturn = addCard(element,delCard);
  renderCard(placesList, addCardReturn);
});
