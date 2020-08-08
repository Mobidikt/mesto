// import { popupPhoto, popupMesto } from "./constants";

// export class Popup {
//   constructor(popupSelector) {
//     this._popup = popupSelector;
//   }

//   _handleEscClose() {
//     if (e.key === "Escape") {
//       const activePopup = document.querySelector(".popup_opened");
//       close(activePopup);
//     }
//   }
//   setEventListeners() {
//     closeButton.addEventListener("click", () => close(popup));
//     closeButtonPhoto.addEventListener("click", () => close(popupPhoto));
//     closeButtonMesto.addEventListener("click", () => close(popupMesto));
//   }

//   open() {
//     this._popup.classList.add("popup_opened");
//     document.addEventListener("keydown", this._handleEscClose);
//     document.addEventListener("click", overlayClose);
//   }

//   close() {
//     this._popup.classList.remove("popup_opened");
//     document.removeEventListener("keydown", this._handleEscClose);
//     document.removeEventListener("click", overlayClose);
//   }
//   overlayClose() {
//     if (e.target.classList.contains("popup")) {
//       const activePopup = document.querySelector(".popup_opened");
//       closePopup(activePopup);
//     }
//   }
// }
