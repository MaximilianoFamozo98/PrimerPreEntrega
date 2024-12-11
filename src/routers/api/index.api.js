const { Router } = require("express");
const productsApiRouter = require("./products.api.js");
const apiRouter = Router();

apiRouter.use("/products", productsApiRouter)

module.exports = apiRouter
