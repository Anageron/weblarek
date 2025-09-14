import "./scss/styles.scss";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { apiProducts } from "./utils/data";
import { apiClient } from "./components/models/ApiClient";
import { API_URL } from "./utils/constants";
import { IOrder } from "./types/index"; // для проверки отправки заказа

//Тестирование каталога
const catalog = new Catalog();
catalog.setProducts(apiProducts.items);

console.log("Массив товаров из каталога:", catalog.getProduct());

const id = apiProducts.items[1].id;
console.log("Получение товара по ID:", catalog.getProductById(id));
console.log("Получение товара по ID:", catalog.getProductById("id"));

const selectItem = apiProducts.items[2];
catalog.setSelectedProduct(selectItem);
console.log("Выбранный товар:", catalog.getSelectedProduct());

//Тестирование корзины
const cart = new Cart();

//Получили товары
const itemToCart = catalog.getProductById(apiProducts.items[1].id);
const itemToCart1 = catalog.getProductById(apiProducts.items[0].id);
const itemToCart2 = catalog.getProductById(apiProducts.items[1].id);

//Проверяем что не undefined и добавляем в корзину
if (itemToCart) cart.addItem(itemToCart);
if (itemToCart1) cart.addItem(itemToCart1);
if (itemToCart2) cart.addItem(itemToCart2);

//Выводим корзину
console.log("Товары в коризне:", cart.getProduct());

//Общая стоимость и общее кол-во
console.log("Общая стоимость:", cart.getTotalPrice());
console.log("Кол-во товаров в корзине:", cart.getTotalCount());

//Проверяем наличие товара по ID
if (itemToCart1)
  console.log("Есть ли товар с этим ID:", cart.hasProduct(itemToCart1.id)); //true
console.log("Есть ли товар с этим ID:", cart.hasProduct("itemToCart1.id")); //false

//Удаляем товар и проверяем
if (itemToCart1) cart.removeProduct(itemToCart1);
console.log("Товары в коризне:", cart.getProduct());

//Очищаем корзину
cart.clear();
console.log("Пустая корзина:", cart.getProduct());

//Тестирование покупателя

const buyer = new Buyer();

//Сохраняем данные оставим одно поле пустое для проверки
buyer.saveData({
  payment: "cash",
  email: "твойилимой@mail.com",
  phone: "+911",
  address: "",
});

//Проверяем поля
console.log("Верно ли заполнены поля:", buyer.validate());

//Добавим адрес и проверим снова
buyer.saveData({
  address: "fffff",
});
console.log("Верно ли заполнены поля:", buyer.validate());

//Выводим данные
console.log("Выводим данные:", buyer.getData());

//Удалим все данные
buyer.clear();
console.log("Удалили данные:", buyer.getData());

const api = new apiClient(API_URL);

//получим товары с сервера
api.getProduct().then((product) => console.log("Товары ", product.items));

const order: IOrder = {
  payment: "online",
  email: "test@test.ru",
  phone: "+71234567890",
  address: "Spb Vosstania 1",
  total: 2200,
  items: [
    "854cef69-976d-4c2a-a18c-2aa45046c390",
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
  ],
};

//отправим заказы на сервер
api.sendOrder(order).then((res) => console.log("Ответ сервера", res));
