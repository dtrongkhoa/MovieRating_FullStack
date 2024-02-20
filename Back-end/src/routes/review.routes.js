const express = require("express");
const controller = require("../controllers/review.controller.js");
const router = express.Router();

router.get("/", controller.all);
router.post("/", controller.create);
router.put("/", controller.updateReview);
router.put("/delete/:reviewID", controller.deleteReview);

module.exports = router;
