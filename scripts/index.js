// @todo: DOM узлы
const template = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(name, link) {
  const card = template.querySelector(".card").cloneNode(true);
  // @todo: Темплейт карточки
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").setAttribute("src", link);
  card.querySelector(".card__image").setAttribute("alt", name);
  const delButton = card.querySelector(".card__delete-button");
  delButton.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    delCard(card);
  });
  renderCard(placesList, card);
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
  addCard(element.name, element.link);
});
