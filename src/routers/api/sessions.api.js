const { Router } = require("express");
const { create, readByEmail, readById } = require("../../data/mongo/managers/users.manager.js");
const isVerifyPassword = require("../../middlewares/isVerifyPassword.mid.js");
const isValidUserData = require("../../middlewares/isValidUserData.mid.js");
const isUser = require("../../middlewares/isUser.mid.js");
const session = require("express-session");

const sessionsRouter = Router();

sessionsRouter.post("/register", isValidUserData, isUser, register);
sessionsRouter.post("/login", isVerifyPassword, login)
sessionsRouter.post("/signout", signout)
sessionsRouter.post("/online", online)

module.exports = sessionsRouter

async function register(req, res, next) {
    try {
        const data = req.body;
        const one = await create(data);
        return res.status(201).json({ message: "USER CREATED", one_id: one._id });
    } catch (error) {
        return next(error);
    }
}
async function login(req, res, next) {
    try {
        const { email } = req.body;
        const one = await readByEmail(email);
        req.session.role = one.role;
        req.session.user_id = one._id;
        return res.status(200).json({ message: "USER LOGGED IN", user_id: one._id });
    } catch (error) {
        return next(error);
    }
}
function signout(req, res, next) {
    try {
        req.session.destroy();
        return res.status(200).json({ message: "USER SIGNGED OUT" });
    } catch (error) {
        return next(error);
    }
}
async function online(req, res, next) {
    try {
        const { user_id } = req.session;
        const one = await readById(user_id);
        if (req.session.user_id) {
            return res.status(200).json({ message: one.email.toUpperCase() + "USER IS ONLINE", online: true });
        } else {
            return res.status(400).json({ message: "USER IS NOT ONLINE", online: false });
        }
    } catch (error) {
        return next(error);
    }
}

