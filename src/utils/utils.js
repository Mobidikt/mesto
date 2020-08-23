import { noCardsPlaceholder, elementList } from "./constants.js";

export function checkAmountOfCards() {
  if (elementList.firstElementChild) {
    noCardsPlaceholder.classList.add("place__placeholder_hidden");
  } else {
    noCardsPlaceholder.classList.remove("place__placeholder_hidden");
  }
}
