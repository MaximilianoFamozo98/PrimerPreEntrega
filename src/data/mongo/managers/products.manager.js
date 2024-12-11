const Product = require("../models/product.model");

const create = async (data) => {
    try {
        const one = await Product.create(data);
        return one
    } catch (error) {
        throw error
    }
};
const read = async () => {
    try {
        const all = await Product.find().lean();
        return all
    } catch (error) {
        throw error
    }
};
const update = async (id, data) => {
    try {
        const opt = { new: true }
        const one = await Product.findByIdAndUpdate(id, data, opt);
        return one
    } catch (error) {
        throw error
    }
};
const destroy = async (id) => {
    try {
        const one = await Product.findByIdAndDelete(id);
        return one
    } catch (error) {
        throw error
    }
};

module.exports = { create, read, update, destroy }

