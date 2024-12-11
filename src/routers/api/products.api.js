const { Router } = require("express");
const { create, read } = require("../../data/mongo/managers/products.manager");

const productsApiRouter = Router();

productsApiRouter.post("/", async (req, res, next) => {
    try {
        const message = "PRODUCT CREATED";
        const data = req.body;
        const response = await create(data);
        return res.status(201).json({ response, message});
    } catch (error) {
        return next(error);
    }
});

productsApiRouter.get("/", async (req, res, next) => {
    try {
        const message = "PRODUCTS FOUND";
        const response = await read();
        return res.status(200).json({ response, message});
    } catch (error) {
        return next(error);
    }
});

module.exports = productsApiRouter;