import { ensureElement } from "../../../utils/utils";
import { ProductCard } from "./ProductCard";
import { IEvents } from "../../base/Events";
import { categoryMap, CDN_URL } from "../../../utils/constants";

export type Category = keyof typeof categoryMap;

export class CatalogCard extends ProductCard {
  protected cardImage: HTMLImageElement;
  protected cardCategory: HTMLElement;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(e, container);

    this.cardImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );
    this.cardCategory = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );

    this.container.addEventListener("click", (e) => {
      e.stopPropagation();
      this.e.emit("cardPreview:open", { id: this.cardId });
    });
  }

  set category(val: Category) {
    this.cardCategory.textContent = val;
    this.cardCategory.className = `card__category ${categoryMap[val]}`;
  }

  set image(val: string) {
    this.setImage(
      this.cardImage,
      CDN_URL + `${val}`,
      this.cardTitle.textContent
    );
  }
}
