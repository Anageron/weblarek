import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected cartCounter: HTMLElement;
  protected cartButton: HTMLButtonElement;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(container);

    this.cartCounter = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );
    this.cartButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container
    );

    this.cartButton.addEventListener("click", () => {
      this.e.emit("cart:open");
    });
  }

  set counter(val: number) {
    this.cartCounter.textContent = String(val);
  }
}
