const { Router } = require("express");

const cookieRouter = Router();

cookieRouter.get("/create", (req, res, next) => {
    try {
        const message = "COOKIE SETEADA";
        return res
        // primero se manda el codigo de estado
        .status(201)
        // luego se manda la cookie
        .cookie("modo", "oscuro")
        .cookie("rolDeUsuario", "admin", {maxAge: 20000})
        // por ulktimo tipo de respuesta con la informacio que se necesite enviar
        .json({message});
    } catch (error) {
        return next(error);
    }
});

cookieRouter.get("/read", (req, res, next) => {
    try {
        const cookies = req.cookies;
        console.log(cookies);
        console.log(cookies ["modo"]);
        const message = "COOKIES LEIDA";
        return res.status(200).json({ message });
    } catch (error) {
        return next(error);
    }
});

cookieRouter.get("/destroy/:cookieAborrar", (req, res, next) => {
    try {
        const { cookieAborrar } = req.params;
        const message = "COOKIES DESTROYED";
        return res
            .status(200)
            .clearCookie( cookieAborrar )
            .json({ message });

        
    } catch (error) {
        return next(error);
    }
});

cookieRouter.get("/signed", (req, res, next) => {
    try {
        const message = "COOKIES FIRMADA CREADA";
       return res.status(201).cookie("nombre", "igna", {signed: true}).json({ message });
    } catch (error) {
        return next(error);
    }
});

cookieRouter.get("/read-signed", (req, res, next) => {
    try {
        const cookies = req.cookies;
        const signedCookies = req.signedCookies;
        return res.status(200).json ({cookies, signedCookies});
    } catch (error) {
        return next(error);
    }
});

module.exports = cookieRouter;




