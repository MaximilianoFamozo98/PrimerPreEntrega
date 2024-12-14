
const User = require('../models/user.models.js'); // Ajusta según tu estructura

const Manager = require("./manager.js");

const usersManager = new Manager(User);
const { create, read, readOne, update, destroy } = usersManager

module.exports = { create, read, readOne, update, destroy }