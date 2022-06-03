/** @format */

const express = require("express");
const router = express.Router();

const { create } = require("../controllers/beforeReview");

router.post("/before-review", create);

module.exports = router;
