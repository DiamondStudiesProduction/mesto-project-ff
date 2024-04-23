import {
  createCard,
  delCard,
  heartLike,
  heartLikeActive,
} from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  config,
  editAvatarRequest,
  deleteLikeRequest,
  putLikeRequest,
  deleteCardRequest,
  createNewCardRequest,
  editProfileRequest,
} from "../components/api.js";
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
const formEditAvatar = document.forms["edit-avatar"];
const inputLink = formEditAvatar.elements.link;
const popupTypeEditAvatar = pageContent.querySelector(
  ".popup_type_edit_avatar"
);
const profileImage = document.querySelector(".profile__image");
let myId = "";

popupList.forEach((elem) => {
  elem.classList.add("popup_is-animated");
});

formEditProfile.addEventListener("submit", editProfileFormSubmit);
formNewPlace.addEventListener("submit", addCardFormSubmit);
formEditAvatar.addEventListener("submit", editAvatarFormSubmit);
replacePopupResetValues();

function renderCard(element, elem) {
  element.prepend(elem);
}

function openImageCard(event) {
  changeAttributeImageCard(event);
  openPopup(popupTypeImage);
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

function removeAvatarValue() {
  inputLink.value = "";
}

function changeInputsValues() {
  replacePopupResetValues();
  removeAddCardValues();
  removeAvatarValue();
}

function loading(element, bool) {
  if (bool) {
    element.textContent = "Сохранение...";
  } else {
    element.textContent = "Сохранить";
  }
}

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const evtElement = evt.target.querySelector(".popup__button");
  loading(evtElement, true);
  const data = {
    name: placeName.value,
    link: link.value,
    likes: [],
    _id: "",
  };
  const prom = new Promise((resolve, reject) => {
    createNewCardRequest(placeName.value, link.value)
      .then((res) => {
        if (res) {
          data._id = res._id;
          return res;
        }
      })
      .then((res) => {
        if (res) {
          const cardReturn = createCard(
            data,
            openImageCard,
            heartLike,
            putLikeRequest,
            deleteLikeRequest,
            deleteCardRequest,
            delCard,
            "",
            ""
          );
          renderCard(placesList, cardReturn);
          closePopup(popupTypeNewCard);
          removeAddCardValues();
        }
      })
      .finally(() => {
        loading(evtElement, false);
      });
  });
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  const evtElement = evt.target.querySelector(".popup__button");
  loading(evtElement, true);
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
  editProfileRequest(inputName.value, inputJob.value).finally(() => {
    loading(evtElement, false);
  });
  closePopup(popupTypeEdit);
}

function editAvatarFormSubmit(evt) {
  evt.preventDefault();
  const evtElement = evt.target.querySelector(".popup__button");
  loading(evtElement, true);
  const url = inputLink.value;
  editAvatarRequest(url)
    .then((response) => {
      if (response) {
        profileImage.style.backgroundImage = `url(${response.avatar})`;
      }
    })
    .finally(() => {
      loading(evtElement, false);
    });
  closePopup(popupTypeEditAvatar);
}

pageContent
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openPopup(popupTypeEdit);
    const openedPopup = document.querySelector(".popup_is-opened");
    clearValidation(openedPopup.querySelector(".popup__form"), {
      inputSelector: ".popup__input",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__form_input-error_active",
      inactiveButtonClass: "popup__button_inactive",
      submitButtonSelector: ".popup__button",
    });
    changeInputsValues();
  });

pageContent
  .querySelector(".profile__add-button")
  .addEventListener("click", () => {
    openPopup(popupTypeNewCard);
    const openedPopup = document.querySelector(".popup_is-opened");
    clearValidation(openedPopup.querySelector(".popup__form"), {
      inputSelector: ".popup__input",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__form_input-error_active",
      inactiveButtonClass: "popup__button_inactive",
      submitButtonSelector: ".popup__button",
    });
    changeInputsValues();
  });

profileImage.addEventListener("click", () => {
  openPopup(popupTypeEditAvatar);
  const openedPopup = document.querySelector(".popup_is-opened");
  clearValidation(openedPopup.querySelector(".popup__form"), {
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__form_input-error_active",
    inactiveButtonClass: "popup__button_inactive",
    submitButtonSelector: ".popup__button",
  });
  changeInputsValues();
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form_input-error_active",
});

const getAboutMe = new Promise((resolve, reject) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      profileImage.style.backgroundImage = `url(${result.avatar})`;
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      myId = result._id;
    })
    .catch((err) => {
      console.log(err);
    });
});

const getCards = new Promise((resolve, reject) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      result.forEach((element) => {
        if (element.owner._id === myId) {
          const createCardReturn = createCard(
            element,
            openImageCard,
            heartLike,
            putLikeRequest,
            deleteLikeRequest,
            deleteCardRequest,
            delCard,
            heartLikeActive,
            myId
          );
          renderCard(placesList, createCardReturn);
        } else {
          const createCardReturn = createCard(
            element,
            openImageCard,
            heartLike,
            putLikeRequest,
            deleteLikeRequest,
            "",
            "",
            heartLikeActive,
            myId
          );
          renderCard(placesList, createCardReturn);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
Promise.all([getAboutMe, getCards]);
