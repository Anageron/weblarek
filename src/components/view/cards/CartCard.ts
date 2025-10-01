import { ensureElement } from "../../../utils/utils";
import { ProductCard } from "./ProductCard";
import { IEvents } from "../../base/Events";

export class CartCard extends ProductCard {
  protected cardIndex: HTMLElement;
  protected cardToDelete: HTMLButtonElement;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(e, container);

    this.cardIndex = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );
    this.cardToDelete = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );

    this.cardToDelete.addEventListener("click", () => {
      this.e.emit("cart:remove", { id: this.cardId });
    });
  }

  set index(val: number) {
    this.cardIndex.textContent = String(val);
  }
}
