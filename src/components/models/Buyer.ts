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

  validate(): { isValid: boolean; errors: Partial<IBuyer> } {
    const errors: Partial<IBuyer> = {};

   
    if (!this.email) {
      errors.email = `Email не заполнен`;
    }

    if (!this.phone) {
      errors.phone =`Телефон не заполнен`;
    }

    if (!this.address) {
      errors.address =`Адрес не заполнен`;
    }
    

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
