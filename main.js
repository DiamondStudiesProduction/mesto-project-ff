(()=>{"use strict";var t=document.querySelector("#card-template").content;function e(e,n,o,r,c,u,a,s,p){var l=t.querySelector(".card").cloneNode(!0);l.querySelector(".card__title").textContent=e.name,l.setAttribute("id","".concat(e._id));var d=l.querySelector(".card__image"),_=l.querySelector(".card__like-button"),f=l.querySelector(".card__like-number"),m=l.querySelector(".card__delete-button");return f.textContent=e.likes.length,d.setAttribute("src",e.link),d.setAttribute("alt",e.name),s&&s(e.likes,p,_),a?m.addEventListener("click",(function(){a(l),u(e._id)})):m.style.display="none",d.addEventListener("click",(function(t){n(t)})),_.addEventListener("click",(function(t){o(t),t.target.classList.contains("card__like-button_is-active")?i(r,l,f):i(c,l,f)})),l}function n(t){t.remove()}function o(t){t.target.classList.contains("card__like-button_is-active")?t.target.classList.remove("card__like-button_is-active"):t.target.classList.add("card__like-button_is-active")}function r(t,e,n){for(var o in t)t[o]._id===e&&n.classList.add("card__like-button_is-active")}function i(t,e,n){t(e.getAttribute("id")).then((function(t){n.textContent=t.likes.length}))}function c(t){!function(t){t.classList.remove("popup_is-opened")}(t),document.removeEventListener("click",a),document.removeEventListener("keydown",s)}function u(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",s),document.addEventListener("click",a)}function a(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close"))&&c(t.target.closest(".popup"))}function s(t){"Escape"===t.key&&c(document.querySelector(".popup_is-opened"))}var p=function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},l=function(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(n.inactiveButtonClass)):(e.disabled=!0,e.classList.add(n.inactiveButtonClass))},d=function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(n){p(t,n,e)})),l(n,o,e)},_="https://nomoreparties.co/v1/wff-cohort-11",f={authorization:"ad072217-ebd0-41b3-9902-d9d3d00fbc15"};function m(t){return fetch("".concat(_,"/cards/likes/").concat(t),{method:"DELETE",headers:{authorization:f.authorization,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){return t})).catch((function(t){console.log(t)}))}function v(t){return fetch("".concat(_,"/cards/likes/").concat(t),{method:"PUT",headers:{authorization:f.authorization,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){return t})).catch((function(t){console.log(t)}))}function y(t){fetch("".concat(_,"/cards/").concat(t),{method:"DELETE",headers:{authorization:f.authorization,"Content-Type":"application/json"}})}var h,S=document.querySelector(".places__list"),b=document.forms["edit-profile"],C=b.elements.name,k=b.elements.description,q=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),E=document.forms["new-place"],L=E.elements["place-name"],j=E.elements.link,z=document.querySelector(".page__content"),A=document.querySelectorAll(".popup"),P=z.querySelector(".popup_type_edit"),x=z.querySelector(".popup_type_image"),B=z.querySelector(".popup_type_new-card"),T=document.forms["edit-avatar"],w=T.elements.link,D=z.querySelector(".popup_type_edit_avatar"),N=document.querySelector(".profile__image"),O="";function J(t,e){t.prepend(e)}function M(t){!function(t){var e=t.target.getAttribute("src");document.querySelector(".popup__image").setAttribute("src",e)}(t),u(x)}function H(){C.value=q.textContent,k.value=g.textContent}function I(){L.value="",j.value=""}function V(){H(),I(),w.value=""}function U(t,e){t.textContent=e?"Сохранение...":"Сохранить"}A.forEach((function(t){t.classList.add("popup_is-animated")})),b.addEventListener("submit",(function(t){t.preventDefault();var e,n,o=t.target.querySelector(".popup__button");U(o,!0),q.textContent=C.value,g.textContent=k.value,(e=C.value,n=k.value,fetch("".concat(_,"/users/me"),{method:"PATCH",headers:{authorization:f.authorization,"Content-Type":"application/json"},body:JSON.stringify({name:e,about:n})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log(t)}))).finally((function(){U(o,!1)})),c(P)})),E.addEventListener("submit",(function(t){t.preventDefault();var r=t.target.querySelector(".popup__button");U(r,!0);var i={name:L.value,link:j.value,likes:[],_id:""};new Promise((function(t,u){var a,s;(a=L.value,s=j.value,fetch("".concat(_,"/cards"),{method:"POST",headers:{authorization:f.authorization,"Content-Type":"application/json"},body:JSON.stringify({name:a,link:s})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){return t})).catch((function(t){console.log(t)}))).then((function(t){if(t)return i._id=t._id,t})).then((function(t){if(t){var r=e(i,M,o,v,m,y,n,"","");J(S,r),c(B),I()}})).finally((function(){U(r,!1)}))}))})),T.addEventListener("submit",(function(t){t.preventDefault();var e,n=t.target.querySelector(".popup__button");U(n,!0),(e=w.value,fetch("".concat(_,"/users/me/avatar"),{method:"PATCH",headers:{authorization:f.authorization,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){return t})).catch((function(t){console.log(t)}))).then((function(t){t&&(N.style.backgroundImage="url(".concat(t.avatar,")"))})).finally((function(){U(n,!1)})),c(D)})),H(),z.querySelector(".profile__edit-button").addEventListener("click",(function(){u(P);var t=document.querySelector(".popup_is-opened");d(t.querySelector(".popup__form"),{inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",errorClass:"popup__form_input-error_active",inactiveButtonClass:"popup__button_inactive",submitButtonSelector:".popup__button"}),V()})),z.querySelector(".profile__add-button").addEventListener("click",(function(){u(B);var t=document.querySelector(".popup_is-opened");d(t.querySelector(".popup__form"),{inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",errorClass:"popup__form_input-error_active",inactiveButtonClass:"popup__button_inactive",submitButtonSelector:".popup__button"}),V()})),N.addEventListener("click",(function(){u(D);var t=document.querySelector(".popup_is-opened");d(t.querySelector(".popup__form"),{inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",errorClass:"popup__form_input-error_active",inactiveButtonClass:"popup__button_inactive",submitButtonSelector:".popup__button"}),V()})),h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__form_input-error_active"},Array.from(document.querySelectorAll(h.formSelector)).forEach((function(t){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);l(n,o,e),n.forEach((function(r){r.addEventListener("input",(function(){!function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?p(t,e,n):function(t,e,n,o){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(t,e,e.validationMessage,n)}(t,r,e),l(n,o,e)}))}))}(t,h)}));var F=new Promise((function(t,e){return fetch("".concat(_,"/users/me"),{headers:{authorization:f.authorization}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){N.style.backgroundImage="url(".concat(t.avatar,")"),q.textContent=t.name,g.textContent=t.about,O=t._id})).catch((function(t){console.log(t)}))})),G=new Promise((function(t,i){return fetch("".concat(_,"/cards"),{headers:{authorization:f.authorization}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){t.forEach((function(t){if(t.owner._id===O){var i=e(t,M,o,v,m,y,n,r,O);J(S,i)}else{var c=e(t,M,o,v,m,"","",r,O);J(S,c)}}))})).catch((function(t){console.log(t)}))}));Promise.all([F,G])})();