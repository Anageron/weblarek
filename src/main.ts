import "./scss/styles.scss";

import { EventEmitter } from "./components/base/Events.ts";
import { Header } from "./components/view/Header";
import { Gallery } from "./components/view/Gallery";
import { Modal } from "./components/view/Modal";
import { CartView } from "./components/view/CartView";
import { Success } from "./components/view/Success";
import { CatalogCard } from "./components/view/cards/CatalogCard";
import { CartCard } from "./components/view/cards/CartCard";
import { SelectedCard } from "./components/view/cards/SelectedCard";
import { CheckoutForm } from "./components/view/form/CheckoutForm";
import { ContactForm } from "./components/view/form/ContactForm";
import { cloneTemplate, ensureElement } from "./utils/utils.ts";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { IOrder, IBuyer } from "./types";
import { apiClient } from "./components/models/ApiClient";
import { API_URL } from "./utils/constants";

const e = new EventEmitter();

const catalog = new Catalog(e);
const cart = new Cart(e);
const buyer = new Buyer();

const api = new apiClient(API_URL);
api
  .getProduct()
  .then((products) => catalog.setProducts(products.items))
  .catch((error) => console.error("Ошибка при загрузке каталога:"));

const headerContainer = ensureElement<HTMLElement>(".header");
const galleryContainer = ensureElement<HTMLElement>(".gallery");
const modalContainer = ensureElement<HTMLElement>(".modal");
const catalogCardTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cartViewTemplate = ensureElement<HTMLTemplateElement>("#basket");
const cartCardTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const selectedCardTemplate =
  ensureElement<HTMLTemplateElement>("#card-preview");
const checkoutFormTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactFormTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successFormTemplate = ensureElement<HTMLTemplateElement>("#success");

const header = new Header(e, headerContainer);
const modal = new Modal(e, modalContainer);
const cartView = new CartView(
  e,
  cloneTemplate<HTMLTemplateElement>(cartViewTemplate)
);
const gallery = new Gallery(galleryContainer);
const order = new CheckoutForm(e, cloneTemplate(checkoutFormTemplate));
const contacts = new ContactForm(e, cloneTemplate(contactFormTemplate));

e.on("modal:close", () => {
  modal.close();
});

e.on("products: change", () => {
  const itemCards = catalog.getProduct().map((item) => {
    const card = new CatalogCard(e, cloneTemplate(catalogCardTemplate));
    return card.render(item);
  });
  gallery.render({ catalog: itemCards });
});

e.on("cart:change", () => {
  const products = cart.getProduct().map((item, i) => {
    const card = new CartCard(e, cloneTemplate(cartCardTemplate));
    card.index = i + 1;
    return card.render(item);
  });
  cartView.render({ catalog: products });
  cartView.totalPrice = cart.getTotalPrice();
  header.counter = cart.getTotalCount();
});

e.on("cart:open", () => {
  cartView.totalPrice = cart.getTotalPrice();
  modal.open(cartView.render());
});

e.on("cardPreview:open", ({ id }: { id: string }) => {
  const item = catalog.getProductById(id);
  const card = new SelectedCard(e, cloneTemplate(selectedCardTemplate));
  if (item)
    !item.price ? card.disable() : (card.isInCart = cart.hasProduct(id));
  modal.open(card.render(item));
});

e.on("cart:add", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (product) cart.addItem(product);
});

e.on("cart:remove", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (product) cart.removeProduct(product);
});

e.on("check:open", () => {
  modal.open(order.render());
});

e.on("contacts:open", () => {
  modal.open(contacts.render());
});

e.on("check:change", (props: Partial<IBuyer>) => {
  buyer.saveData(props);
  const valid = buyer.validateOrder();
  order.valid = valid.isValid;
  order.error = Object.values(valid.errors)[0];
});

e.on("contacts:change", (props: Partial<IBuyer>) => {
  buyer.saveData(props);
  const valid = buyer.validateContacts();
  contacts.valid = valid.isValid;
  contacts.error = Object.values(valid.errors)[0];
});

e.on("success:open", () => {
  const { payment, email, phone, address } = buyer.getData();
  const total = cart.getTotalPrice();
  const items = cart.getProduct().map((item) => item.id);
  const order: IOrder = {
    payment,
    email,
    phone,
    address,
    total,
    items,
  };
  api
    .sendOrder(order)
    .then((res) => console.log("Ответ сервера", res))
    .catch((error) => console.error("Ошибка при отправке заказа:", error));
  const success = new Success(e, cloneTemplate(successFormTemplate));
  success.description = cart.getTotalPrice();
  modal.open(success.render());
});

e.on("success:close", () => {
  cart.clear();
  buyer.clear();
});
