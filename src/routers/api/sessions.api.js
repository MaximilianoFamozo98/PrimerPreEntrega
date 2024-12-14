const { Router } = require("express");
const { create } = require("../../data/mongo/managers/users.manager.js");
const isVerifyPassword = require("../../middlewares/isVerifyPassword.mid.js");
const session = require("express-session");

const sessionsRouter = Router();

sessionsRouter.post("/register", async (req, res, next) => {
    // middlewares para validar campos obligatorios
    // middlewares de uuarios inexistentes
    
    try {
        const data = req.body;
        const response = await create(data);
        const message = "USER REGISTRED";
        return res.status(201).json({ message, response });
    } catch (error) {
        return next(error);
    }
});

sessionsRouter.post("/login", 
    // middlewares para verificar usuario y contraseña correctas
    isVerifyPassword,
     (req, res, next) => {
    try {
        req.session.online = true;
        req.session.email = req.body.email;
        const message = "USER LOGGED IN";
        return res.status(200).json({ message });
    } catch (error) {
        return next(error);
    }
});

sessionsRouter.post("/signout", async (req, res, next) => {
    try {
        const sessions = req.session;
        req.session.destroy();
        return res.status(200).json({ message: "USER SIGNED OUT", sessions });
        
    } catch (error) {
        return next(error);
    }
});

sessionsRouter.post("/online", (req, res, next) => {
    try {
        const sessions = req.session;
        if (sessions.online) {
            return res.status(200).json({ message: "USER IS ONLINE", sessions });
        }
        return res.status(401).json({ message: "INVALID CREDENTIALS" });
    } catch (error) {
        return next(error);
    }
});
module.exports = sessionsRouter