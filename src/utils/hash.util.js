const { genSaltSync, hashSync, compareSync } = require("bcrypt");


function createHashUtil(password) {
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);
    return hashPassword;
}

function verifyHashUtil(password, dbPass) {
    const verify = compareSync(password, dbPass);
    return verify;
}




module.exports = { createHashUtil, verifyHashUtil };
