const { connect } = require("mongoose");


async function dbConnect() {
    try {
        connect(process.env.MONGO_LINK);
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;

