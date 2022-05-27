/** @format */

const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const {
	requireSignin,
	isAuth,
	isAdmin,
	isEmployee,
} = require("../controllers/auth");

const {
	create,
	list,
	read,
	reservationById,
	listToBook,
	getStatusValues,
	updateOrderStatus,
	updateOrderScheduleDate,
	updateReservation,
	remove,
} = require("../controllers/reservation");

router.post("/reservation-create", create);
router.get("/all-reservations/:userId", requireSignin, isAuth, isAdmin, list);
router.get(
	"/all-reservations-employee/:userId",
	requireSignin,
	isAuth,
	isEmployee,
	list,
);
router.get("/all-reservations", listToBook);
router.get("/reservation/:reservationId", read);

router.get(
	"/order/status-values/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	getStatusValues,
);

router.get(
	"/order/status-values-employee/:userId",
	requireSignin,
	isAuth,
	isEmployee,
	getStatusValues,
);

router.put(
	"/order/:reservationId/status/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	updateOrderStatus,
);

router.put(
	"/order/:reservationId/status-employee/:userId",
	requireSignin,
	isAuth,
	isEmployee,
	updateOrderStatus,
);

router.put(
	"/order/:reservationId/date/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	updateOrderScheduleDate,
);

router.put(
	"/reservation/:reservationId/:userId",
	requireSignin,
	isAuth,
	updateReservation,
);

router.delete(
	"/reservation/:reservationId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	remove,
);

router.param("userId", userById);
router.param("reservationId", reservationById);

module.exports = router;
