const { readOne } = require("../data/mongo/managers/users.manager");

async function isVerifyPassword(req, res, next) {
    try {
        const { email, password } = req.body;
        const one = await readOne(email);
        // cerificamos que el usuario existe
        if (one) {

            // luego que la contraseña de ese usuario sea correcta
            const verify = password === one.password;
            if (verify) {
                return next();
            }
        }
        const message = "INVALID CREDENTIALS";
        return res.status(401).json({ message });
    } catch (error) {
        return next(error);
    }
}

module.exports = isVerifyPassword