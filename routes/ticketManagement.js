/** @format */

const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const {
	create,
	ticketManagementById,
	read,
	remove,
	update,
	list,
} = require("../controllers/ticketManagement");

router.get("/ticketManagement/:ticketmanagementId", read);

router.post(
	"/ticketmanagement/create/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	create,
);

router.put(
	"/ticketManagement/:ticketmanagementId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	update,
);
router.delete(
	"/ticketManagement/:ticketmanagementId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	remove,
);

router.get("/ticketManagement", list);

router.param("userId", userById);
router.param("ticketmanagementId", ticketManagementById);

module.exports = router;
