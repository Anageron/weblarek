import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICart {
  catalog: HTMLElement[];
}

export class CartView extends Component<ICart> {
  protected orderTotal: HTMLElement;
  protected cartButton: HTMLButtonElement;
  protected cartItems: HTMLElement;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(container);

    this.cartItems = ensureElement<HTMLElement>(
      ".basket__list",
      this.container
    );
    this.orderTotal = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );
    this.cartButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );

    this.cartButton.addEventListener("click", () => {
      this.e.emit("check:open");
    });
  }

  set totalPrice(val: number) {
    if (val) {
      this.cartButton.disabled = false;
    } else {
      this.cartButton.disabled = true;
      this.cartItems.textContent = "Корзина пуста";
    }
    this.orderTotal.textContent = String(val) + " синапсов";
  }

  set catalog(cards: HTMLElement[]) {
    this.cartItems.replaceChildren(...cards);
  }
}
