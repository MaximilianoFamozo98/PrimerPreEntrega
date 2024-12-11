const { Router } = require("express");
const apiRouter = require("./api/index.api.js");
const indexRouter = Router();

//indexRouter.use("/", viewsRouter);
indexRouter.use("/api", apiRouter); 

module.exports = indexRouter