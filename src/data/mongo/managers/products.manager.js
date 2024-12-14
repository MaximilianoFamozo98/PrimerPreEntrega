const Product = require("../models/product.model.js");
const Manager = require("./manager.js");

const productsManager = new Manager(Product);
const { create, read, update, destroy } = productsManager

module.exports = { create, read, update, destroy }