import express from "express";
import { productManager } from "./ProductManager.js";
import { CartManager } from "./CartManager.js";
import { Product } from "./Product.js";
import { productsRoutes } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
const app = express();

app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRouter);

const port = 8080;

app.listen(port, (req, res) => {
  console.log(`Server ok ${port}`);
});

//productos
const product1 = new Product(
  "producto prueba",
  "este es un producto prueba",
  2000,
  "sin imagen",
  "abc123",
  25
);

const product2 = new Product(
  "producto prueba2",
  "este es un producto prueba",
  2000,
  "sin imagen",
  "abc1234",
  25
);

const product3 = new Product(
  "producto prueba3",
  "este es un producto prueba",
  2000,
  "sin imagen",
  "abc12347",
  25
);

const init = async () => {
  await productManager.addProduct(product1);
  await productManager.addProduct(product2);
  await productManager.addProduct(product3);
};
init();