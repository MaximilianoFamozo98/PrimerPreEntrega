const express = require("express");
const { Router } = express;
const route = new Router();
const ProductManagerMongo = require("../dao/db/ProductManager.js");
const ProductModel = require("../dao/db/models/products.model.js");
const productmanagermongo = new ProductManagerMongo();

//Base de datos MongoDB 
//revirsar este metodo 
route.get("/allProducts", async (req,res) => {
    try {
      let resp = await ProductModel.find()
      res.send({
        msg : "Productos encontrados",
        data : resp
      })
    } catch (err) {
      console.log(err)
    }
  })

route.post("/createProd", async (req, res)=> {
  console.log(req.body)
    try {
        const {name, category, price, stock} = req.body
        const responese = await productmanagermongo.addProduct({name, category, price, stock})
        res.json(responese)
      } catch (error) {
        console.log(error)
        res.send("Error al intentar agregar producto")
      }
}) 
module.exports = route