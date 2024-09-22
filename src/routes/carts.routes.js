const express = require('express');
const { CartManager } = require("../dao/fileSystem/CartManager.js");
const cartsRouter = express.Router(); // Aquí utilizamos express.Router()

cartsRouter.post("/", async (req, res) => {
  try {
    const response = await CartManager.newCart();
    res.json(response);
  } catch (error) {
    res.send("error al crear carrito");
  }
});

cartsRouter.get("/:id", async (req, res) => { // Corregí aquí la ruta :id
  const id = req.params.id;
  try {
    const response = await CartManager.getCart(id);
    res.json(response);
  } catch (error) {
    res.send(`error id no valido ${id}`);
  }
});

cartsRouter.post("/:id/products/:pid", async (req, res) => {
  const idCart = req.params.id;
  const idProduct = req.params.pid;
  try {
    const response = await CartManager.addProductTheCart(idCart, idProduct);
    res.send("se agrego el producto !!");
  } catch (error) {
    res.send("error al agregar el producto");
  }
});

module.exports = { cartsRouter };
