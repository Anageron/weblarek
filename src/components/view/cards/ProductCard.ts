import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IProductCard {
  id: string;
  title: string;
  price: number | null;
}

export class ProductCard extends Component<IProductCard> {
  protected cardId: string = "";
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(container);

    this.cardTitle = ensureElement<HTMLElement>(".card__title", this.container);
    this.cardPrice = ensureElement<HTMLElement>(".card__price", this.container);
  }

  set id(val: string) {
    this.cardId = val;
  }

  set title(val: string) {
    this.cardTitle.textContent = val;
  }

  set price(val: number | null) {
    if (val) {
      this.cardPrice.textContent = String(val) + " синапсов";
    } else this.cardPrice.textContent = "Бесценно";
  }
}
