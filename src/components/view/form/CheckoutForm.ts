import { ensureElement } from "../../../utils/utils";
import { FormModal } from "./FormModal";
import { IEvents } from "../../base/Events";

export class CheckoutForm extends FormModal {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  protected address: string = "";

  constructor(protected e: IEvents, container: HTMLElement) {
    super(e, container);

    this.cardButton = ensureElement<HTMLButtonElement>(
      "[name=card]",
      this.container
    );

    this.cashButton = ensureElement<HTMLButtonElement>(
      "[name=cash]",
      this.container
    );

    this.addressInput = ensureElement<HTMLInputElement>(
      ".form__input",
      this.container
    );

    this.cardButton.addEventListener("click", () => {
      this.cardButton.classList.add("button_alt-active");
      this.cashButton.classList.remove("button_alt-active");
      this.e.emit("check:change", { payment: "card" });
    });
    this.cashButton.addEventListener("click", () => {
      this.cashButton.classList.add("button_alt-active");
      this.cardButton.classList.remove("button_alt-active");
      this.e.emit("check:change", { payment: "cash" });
    });

    this.addressInput.addEventListener("change", (e) => {
      e.stopPropagation();
      this.address = (e.target as HTMLInputElement).value.trim();
      this.e.emit("check:change", { address: this.address });
    });

    this.submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.e.emit("contacts:open");
    });
  }
}
