const Product = require("../models/product.model.js");
const Manager = require("./manager.js");

const productsManager = new Manager(Product);
const { create, readById, update, destroy } = productsManager

module.exports = { create, readById, update, destroy }