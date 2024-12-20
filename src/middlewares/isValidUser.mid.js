
const { readByEmail } = require("../data/mongo/managers/users.manager.js");




async function isValidUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const one = await readByEmail(email);
        if (one) {
            return next();
        }
        const error = new Error("INVALID CREDENTIALS");
        error.statusCode = 401;
        throw error;

    } catch (error) {
        return next(error);
    }
}

module.exports = isValidUser;