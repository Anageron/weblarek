import { ensureElement } from "../../../utils/utils";
import { CatalogCard } from "./CatalogCard";
import { IEvents } from "../../base/Events";
import { categoryMap } from "../../../utils/constants";

export type Category = keyof typeof categoryMap;

export class SelectedCard extends CatalogCard {
  protected cardText: HTMLElement;
  protected cardButton: HTMLButtonElement;
  protected inCart: boolean = false;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(e, container);

    this.cardText = ensureElement<HTMLElement>(".card__text", this.container);
    this.cardButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );

    this.isInCart = false;

    this.cardButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.inCart) {
        this.e.emit("cart:remove", { id: this.cardId });
      } else {
        this.e.emit("cart:add", { id: this.cardId });
      }
      setTimeout(() => this.e.emit("modal:close"), 200);
    });
  }

  set isInCart(value: boolean) {
    this.inCart = value;
    this.cardButton.textContent = value ? "Удалить из корзины" : "Купить";
  }

  disable() {
    this.cardButton.disabled = true;
    this.cardButton.textContent = "Недоступно";
  }

  set description(val: string) {
    this.cardText.textContent = val;
  }
}
