/** @format */

const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
	create,
	list,
	read,
	reservationById,
	listToBook,
} = require("../controllers/reservation");

router.post("/reservation-create", create);
router.get("/all-reservations/:userId", requireSignin, isAuth, isAdmin, list);
router.get("/all-reservations", listToBook);
router.get("/order/:reservationId", read);

router.param("userId", userById);
router.param("reservationId", reservationById);

module.exports = router;
