import { ensureElement } from "../../../utils/utils";
import { FormModal } from "./FormModal";
import { IEvents } from "../../base/Events";

export class ContactForm extends FormModal {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  protected email: string = "";
  protected phone: string = "";

  constructor(protected e: IEvents, container: HTMLElement) {
    super(e, container);

    this.emailInput = ensureElement<HTMLInputElement>(
      "[name=email]",
      this.container
    );

    this.phoneInput = ensureElement<HTMLInputElement>(
      "[name=phone]",
      this.container
    );

    this.emailInput.addEventListener("change", (e) => {
      e.stopPropagation();
      this.email = (e.target as HTMLInputElement).value.trim();
      this.e.emit("contacts:change", { email: this.email });
    });

    this.phoneInput.addEventListener("change", (e) => {
      e.stopPropagation();
      this.phone = (e.target as HTMLInputElement).value.trim();
      this.e.emit("contacts:change", { phone: this.phone });
    });

    this.submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.e.emit("success:open");
    });
  }
}
