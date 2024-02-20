const express = require("express");
const controller = require("../controllers/movie.controller.js");
const router = express.Router();

router.get("/", controller.all);

module.exports = router;
