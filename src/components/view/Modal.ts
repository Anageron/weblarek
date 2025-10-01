import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {}

export class Modal extends Component<IModal> {
  protected closeButton: HTMLButtonElement;
  protected content: HTMLElement;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );
    this.content = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );

    this.closeButton.addEventListener("click", () => {
      this.e.emit("modal:close");
    });

    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) {
        this.e.emit("modal:close");
      }
    });
  }

  open(content: HTMLElement) {
    this.content.replaceChildren(content);
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
    this.content.replaceChildren();
  }
}
