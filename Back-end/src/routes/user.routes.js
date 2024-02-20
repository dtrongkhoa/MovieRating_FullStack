const express = require("express");
const controller = require("../controllers/user.controller.js");
const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get("/", controller.all);

router.post("/login", asyncHandler(controller.login));

router.post("/register", asyncHandler(controller.create));

router.get("/:username", asyncHandler(controller.oneByUsername));

router.put("/:username", asyncHandler(controller.update));

router.delete("/:username", asyncHandler(controller.delete));

router.put("/update", controller.update);

module.exports = router;
