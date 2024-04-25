const template = document.querySelector("#card-template").content;

export function createCard(
  dataCard,
  openImageCardCallBack,
  putLikeRequestCallBack,
  deleteLikeRequestCallBack,
  deleteCardRequestCallBack,
  delCardCallBack,
  heartLikeActiveCallBack,
  myId
) {
  const card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = dataCard.name;
  card.setAttribute("id", `${dataCard._id}`);
  const cardImage = card.querySelector(".card__image");
  const cardLike = card.querySelector(".card__like-button");
  const cardLikeNumber = card.querySelector(".card__like-number");
  const buttonDel = card.querySelector(".card__delete-button");
  cardLikeNumber.textContent = dataCard.likes.length;
  cardImage.setAttribute("src", dataCard.link);
  cardImage.setAttribute("alt", dataCard.name);

  if (heartLikeActiveCallBack) {
    heartLikeActiveCallBack(dataCard.likes, myId, cardLike);
  }

  if (delCardCallBack) {
    buttonDel.addEventListener("click", () => {
      deleteCardRequestCallBack(dataCard._id)
        .then((data) => {
          if (data) {
            delCardCallBack(card);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } else {
    buttonDel.style.display = "none";
  }

  cardImage.addEventListener("click", (event) => {
    openImageCardCallBack(event);
  });

  cardLike.addEventListener("click", (event) => {
    if (event.target.classList.contains("card__like-button_is-active")) {
      likeAction(deleteLikeRequestCallBack, card, cardLikeNumber, event.target);
    } else {
      likeAction(putLikeRequestCallBack, card, cardLikeNumber, event.target);
    }
  });
  return card;
}

export function delCard(element) {
  element.remove();
}

function heartLike(likeElement) {
  if (likeElement.classList.contains("card__like-button_is-active")) {
    likeElement.classList.remove("card__like-button_is-active");
  } else {
    likeElement.classList.add("card__like-button_is-active");
  }
}

export function heartLikeActive(obj, myId, cardLike) {
  for (const key in obj) {
    if (obj[key]._id === myId) {
      cardLike.classList.add("card__like-button_is-active");
    }
  }
}

function likeAction(func, card, cardLikeNumber, likeElement) {
  func(card.getAttribute("id"))
    .then((data) => {
      if (data) {
        heartLike(likeElement);
        cardLikeNumber.textContent = data.likes.length;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
