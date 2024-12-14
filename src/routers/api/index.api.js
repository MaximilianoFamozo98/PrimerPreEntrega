const { Router } = require("express");
const productsApiRouter = require("./products.api.js");
const cookiesRouter = require("./cookies.api.js");
const sessionsRouter = require("./sessions.api.js");

const apiRouter = Router();

apiRouter.use("/products", productsApiRouter)
apiRouter.use("/cookies", cookiesRouter)
apiRouter.use("/sessions", sessionsRouter)
module.exports = apiRouter
