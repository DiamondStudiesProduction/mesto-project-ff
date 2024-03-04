// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const template = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function addCard(elem) {
  elem.forEach((element) => {
    const card = template.querySelector(".card").cloneNode(true);
    card.querySelector(".card__title").textContent = element.name;
    card.querySelector(".card__image").setAttribute("src", element.link);
    placesList.append(card);
  });
  delCard();
}

function delCard() {
  const delButton = document.querySelectorAll(".card__delete-button");
  delButton.forEach((element) => {
    element.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      card.remove();
    });
  });
}

addCard(initialCards);
