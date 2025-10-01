import { IBuyer, IErrors } from "../../types";

export class Buyer {
  private data: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };

  saveData(data: Partial<IBuyer>): void {
    Object.assign(this.data, data);
  }

  getData(): IBuyer {
    const { payment, email, phone, address } = this.data;

    return {
      payment,
      email,
      phone,
      address,
    };
  }

  clear(): void {
    this.data.payment = "";
    this.data.email = "";
    this.data.phone = "";
    this.data.address = "";
  }

  validateOrder(): { isValid: boolean; errors: Partial<IErrors> } {
    const errors: Partial<IErrors> = {};
    const { payment, address } = this.data;

    if (!payment) {
      errors.payment = `Способ оплаты не выбран`;
    }

    if (!address) {
      errors.address = `Адрес не заполнен`;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  validateContacts(): { isValid: boolean; errors: Partial<IErrors> } {
    const errors: Partial<IErrors> = {};
    const { email, phone } = this.data;

    if (!email) {
      errors.email = `Email не заполнен`;
    }

    if (!phone) {
      errors.phone = `Телефон не заполнен`;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
