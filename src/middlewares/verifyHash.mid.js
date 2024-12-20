
const { verifyHashUtil } = require  ("../utils/hash.util.js");

const { readByEmail } = require("../data/mongo/managers/users.manager.js");

// Lógica del middleware


async function VerifyHash(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await readByEmail(email);
        const dbPassword = user.password;
        const verify = verifyHashUtil(password, dbPassword);
        if (verify) {
            return next();
        } else {
            const error = new Error("INVALID CREDENTIALS");
            error.statusCode = 401;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

module.exports = VerifyHash


