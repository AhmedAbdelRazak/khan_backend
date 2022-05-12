/** @format */

const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const {
	create,
	ticketsById,
	read,
	remove,
	update,
	list,
} = require("../controllers/tickets");

router.get("/tickets/:ticketId", read);

router.post("/tickets/create/:userId", requireSignin, isAuth, isAdmin, create);

router.put(
	"/tickets/:ticketId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	update,
);
router.delete(
	"/tickets/:ticketId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	remove,
);

router.get("/tickets", list);

router.param("userId", userById);
router.param("ticketId", ticketsById);

module.exports = router;
