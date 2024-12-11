const { model, Schema } = require("mongoose");

const collection = "products";
// ingles
// plural
// minusculas
// representativo del recurso
const schema = new Schema({
    title: { type: String, required: true, index: true },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 10 },
    category: { type: String, enum: ["celulares", "computadoras", "tablets"], default: "computadoras" },
});

const Product = model(collection, schema);

module.exports = Product;
