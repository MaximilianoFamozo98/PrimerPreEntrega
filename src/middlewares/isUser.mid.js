const { readByEmail } = require("../data/mongo/managers/users.manager.js");

async function isUser(req, res, next) {
    try {
        const { email } = req.body;
        const one = await readByEmail(email);
        if (one) {
            const error = new Error("USER ALREADY EXISTST");
            error.statusCode = 400;
            throw error;
        }
        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = isUser;