const express = require("express");
const controller = require("../controllers/reservation.controller");
const router = express.Router();

router.get("/", controller.all);
router.post("/", controller.create);
router.put("/", controller.updateReservation);
router.put("/delete/:reservationID", controller.deleteReservation);

module.exports = router;
