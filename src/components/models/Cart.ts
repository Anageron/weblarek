import { IProduct } from "../../types";

export class Cart {
  private items: IProduct[] = [];

  getProduct(): IProduct[] {
    return [...this.items];
  }

  addItem(product: IProduct): void {
    this.items.push({ ...product });
  }

  removeProduct(product: IProduct): void {
    const index = this.items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  clear(): void {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  getTotalCount(): number {
    return this.items.length;
  }

  hasProduct(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}
