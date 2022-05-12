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
	locatioById,
} = require("../controllers/siteLocation");

// routes
router.post("/location/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/locations", list);
router.delete(
	"/location/:locationId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	remove,
);

router.param("userId", userById);
router.param("locationId", locatioById);

module.exports = router;
