import { Component } from "../base/Component";

interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogItems: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.catalogItems = this.container;
  }

  set catalog(cards: HTMLElement[]) {
    this.catalogItems.replaceChildren(...cards);
  }
}
