import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IFormModal {
  isValid: boolean;
  errorText?: string;
}

export abstract class FormModal extends Component<IFormModal> {
  protected errors: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(protected e: IEvents, container: HTMLElement) {
    super(container);

    this.errors = ensureElement<HTMLElement>(".form__errors", this.container);
    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );
  }
  set error(val: string) {
    this.errors.textContent = val;
  }

  set valid(isValid: boolean) {
    this.submitButton.disabled = !isValid;
  }
}
