import { IApi, IProductsResponse, IOrder, IOrderResponse } from "../../types";
import { Api } from "../base/Api";

export class apiClient {
  protected api: IApi;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.api = new Api(baseUrl, options);
  }

  getProduct(): Promise<IProductsResponse> {
    return this.api.get<IProductsResponse>("/product/");
  }

  sendOrder(order: IOrder): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order/", order);
  }
}
