import { createCard, delCard, heartLikeActive } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  editAvatarRequest,
  deleteLikeRequest,
  putLikeRequest,
  deleteCardRequest,
  createNewCardRequest,
  editProfileRequest,
  getAboutMe,
  getCards,
} from "../components/api.js";
const placesList = document.querySelector(".places__list");
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const placeName = formNewPlace.elements["place-name"];
const formEditAvatar = document.forms["edit-avatar"];
const inputLink = formEditAvatar.elements.link;
const inputName = formEditProfile.elements.name;
const inputJob = formEditProfile.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const link = formNewPlace.elements.link;
const pageContent = document.querySelector(".page__content");
const popupList = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup__image");
const popupTypeEdit = pageContent.querySelector(".popup_type_edit");
const popupTypeImage = pageContent.querySelector(".popup_type_image");
const popupTypeNewCard = pageContent.querySelector(".popup_type_new-card");
const popupTypeEditAvatar = pageContent.querySelector(
  ".popup_type_edit_avatar"
);
const profileImage = document.querySelector(".profile__image");
let myId = "";
const popupCaption = document.querySelector(".popup__caption");
const clearValidationParams = {
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form_input-error_active",
  inactiveButtonClass: "popup__button_inactive",
  submitButtonSelector: ".popup__button",
};

popupList.forEach((element) => {
  element.classList.add("popup_is-animated");
});

formEditProfile.addEventListener("submit", editProfileFormSubmit);
formNewPlace.addEventListener("submit", addCardFormSubmit);
formEditAvatar.addEventListener("submit", editAvatarFormSubmit);
replacePopupResetValues();

function renderAddedCard(container, element) {
  container.prepend(element);
}

function renderLoadingCard(container, element) {
  container.append(element);
}

function openImageCard(event) {
  changeAttributeImageCard(event);
  openPopup(popupTypeImage);
}

function changeAttributeImageCard(event) {
  const cardImageSrc = event.target.getAttribute("src");
  const cardTitle = event.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  popupImage.setAttribute("src", cardImageSrc);
  popupImage.setAttribute("alt", cardTitle);
  popupCaption.textContent = cardTitle;
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
  createNewCardRequest(placeName.value, link.value)
    .then((res) => {
      if (res) {
        data._id = res._id;
        return res;
      }
    })
    .then(() => {
      const cardReturn = createCard(
        data,
        openImageCard,
        putLikeRequest,
        deleteLikeRequest,
        deleteCardRequest,
        delCard,
        "",
        ""
      );
      renderAddedCard(placesList, cardReturn);
      closePopup(popupTypeNewCard);
      removeAddCardValues();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading(evtElement, false);
    });
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  const evtElement = evt.target.querySelector(".popup__button");
  loading(evtElement, true);

  editProfileRequest(inputName.value, inputJob.value)
    .then((res) => {
      if (res) {
        profileTitle.textContent = inputName.value;
        profileDescription.textContent = inputJob.value;
        closePopup(popupTypeEdit);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading(evtElement, false);
    });
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
        closePopup(popupTypeEditAvatar);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading(evtElement, false);
    });
}

pageContent
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openPopup(popupTypeEdit);
    clearValidation(formEditProfile, clearValidationParams);
    changeInputsValues();
  });

pageContent
  .querySelector(".profile__add-button")
  .addEventListener("click", () => {
    openPopup(popupTypeNewCard);
    clearValidation(formNewPlace, clearValidationParams);
    changeInputsValues();
  });

profileImage.addEventListener("click", () => {
  openPopup(popupTypeEditAvatar);
  clearValidation(formEditAvatar, clearValidationParams);
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

Promise.all([getAboutMe(), getCards()])
  .then(([resultGetAboutMe, resultGetCards]) => {
    profileImage.style.backgroundImage = `url(${resultGetAboutMe.avatar})`;
    profileTitle.textContent = resultGetAboutMe.name;
    profileDescription.textContent = resultGetAboutMe.about;
    myId = resultGetAboutMe._id;

    resultGetCards.forEach((element) => {
      if (element.owner._id === myId) {
        const createCardReturn = createCard(
          element,
          openImageCard,
          putLikeRequest,
          deleteLikeRequest,
          deleteCardRequest,
          delCard,
          heartLikeActive,
          myId
        );
        renderLoadingCard(placesList, createCardReturn);
      } else {
        const createCardReturn = createCard(
          element,
          openImageCard,
          putLikeRequest,
          deleteLikeRequest,
          "",
          "",
          heartLikeActive,
          myId
        );
        renderLoadingCard(placesList, createCardReturn);
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
