const { model, Schema } = require("mongoose");

const collection = "users";
// ingles
// plural
// minusculas
// representativo del recurso
const schema = new Schema({
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"] },
    verifyUser: { type: Boolean, default: false },
    verifyCode: { type: String, default: "1234" },
});

const User = model(collection, schema);

module.exports = User;