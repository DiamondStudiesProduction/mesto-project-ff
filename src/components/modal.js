function removePopup(elememt) {
  elememt.classList.remove("popup_is-opened");
}

export function closePopup(elememt) {
  removePopup(elememt);
  document.removeEventListener("click", closeByOverlay);
  document.removeEventListener("keydown", closeByEsc);
}

export function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("click", closeByOverlay);
}

function closeByOverlay(event) {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__close")
  ) {
    const elememt = event.target.closest(".popup");
    closePopup(elememt);
  }
}

function closeByEsc(event) {
  if (event.key === "Escape") {
    const elememt = document.querySelector(".popup_is-opened");
    closePopup(elememt);
  }
}
