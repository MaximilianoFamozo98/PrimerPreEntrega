const express = require("express");
const { Router } = express;
const router = new Router();


router.get("/chat", (req, res) => {
    res.render("home")
})



module.exports = router
