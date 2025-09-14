import { IBuyer, TPayment } from "../../types";

export class Buyer {
  private payment: TPayment = "online";
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  saveData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.address !== undefined) this.address = data.address;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clear(): void {
    this.payment = "online";
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.payment) {
      errors.push(`Тип оплаты не выбран`);
    }

    if (!this.email || this.email === "") {
      errors.push(`Email не заполнен`);
    }

    if (!this.phone || this.phone === "") {
      errors.push(`Телефон не заполнен`);
    }

    if (!this.address || this.address === "") {
      errors.push(`Адрес не заполнен`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
