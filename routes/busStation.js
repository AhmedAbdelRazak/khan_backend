/** @format */

const express = require("express");
const router = express.Router();

// middlewares
const { isAuth, isAdmin, requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// controller
const {
	create,
	remove,
	list,
	busStationById,
} = require("../controllers/busStation");

// routes
router.post(
	"/bus-station/create/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	create,
);
router.get("/bus-stations", list);
router.delete(
	"/bus-station/:busStationId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	remove,
);

router.param("userId", userById);
router.param("busStationId", busStationById);

module.exports = router;
