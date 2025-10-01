import { IProduct } from "../../types";
import { IEvents } from "../base/Events.ts";

export class Catalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(protected e: IEvents) {}

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.e.emit("products: change");
  }

  getProduct(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct ? this.selectedProduct : null;
  }
}
