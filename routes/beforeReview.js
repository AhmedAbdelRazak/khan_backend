/** @format */

const express = require("express");
const router = express.Router();

const { create, list } = require("../controllers/beforeReview");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.post("/before-review", create);
router.get(
	"/all-reservations-uncomplete/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	list,
);

router.param("userId", userById);
module.exports = router;
