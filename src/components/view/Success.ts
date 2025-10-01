import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IEvents } from "../base/Events.ts";

interface ISuccess {
  description: string;
}

export class Success extends Component<ISuccess> {
  protected successDescription: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(container);
    this.successDescription = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container
    );
    this.button = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container
    );

    this.button.addEventListener("click", () => {
      this.e.emit("success:close");
      this.e.emit("modal:close");
    });
  }

  set description(val: number) {
    this.successDescription.textContent = `Списано ${val} синапсов`;
  }
}
