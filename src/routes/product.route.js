const express = require("express");
const { Router } = express;
const route = new Router();

const ProductModel = require("../dao/db/models/products.model.js");
const { status } = require("express/lib/response.js");
const ProductManagerMongo = require("../dao/db/ProductManager.js");
const productmanagermongo = new ProductManagerMongo();



// Ruta para obtener todos los productos
route.get("/", async (req, res) => {
  try {
    // Buscar todos los productos en la base de datos
    let resp = await ProductModel.find();
    // Envía la respuesta con los productos encontrados
    res.status(200).send({
      msg: "Productos encontrados",
      data: resp
    });
  } catch (err) {
    // En caso de error, registra el error y responde al cliente
    console.error(err);
    // Devuelve una respuesta de error con un estado HTTP 500
    res.status(500).send({
      msg: "Error al obtener los productos",
      error: err.message // Envía el mensaje de error
    });
  }
});

// Ruta para crear un nuevo producto
route.post("/createProd", async (req, res) => {
  console.log(req.body);
  try {
    const { name, category, price, stock } = req.body;
    const response = await productmanagermongo.addProduct({ name, category, price, stock });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.send("Error al intentar agregar producto");
  }
});


route.put("/:uid", async (req, res) => {
  try {
    let { uid } = req.params;
    let { price, stock } = req.body;

    // Realizar una actualización parcial del documento
    const result = await ProductModel.findByIdAndUpdate(
      uid,
      { price, stock },  // Solo actualiza los campos price y stock
      { new: true }  // Devuelve el producto actualizado
    );

    res.send({ status: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al intentar actualizar el producto");
  }
});

route.delete("/:uid", async (req, res) => {
  try {
    let { uid } = req.params;
   
    let result = await ProductModel.deleteOne({_id: uid});

    res.send({ status: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.send({status: "Error", error});
  }
});



module.exports = route;
