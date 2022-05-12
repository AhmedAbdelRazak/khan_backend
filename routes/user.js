/** @format */

const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
	userById,
	read,
	update,
	allUsersList,
	updateUserByAdmin,
	updatedUserId,
	updateUserByAdminClients,
} = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
	res.json({
		user: req.profile,
	});
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/allUsers/:userId", requireSignin, isAuth, isAdmin, allUsersList);

router.put(
	"/user/:updatedUserId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	updateUserByAdmin,
);

router.put(
	"/client-update/:updatedUserId/activation/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	updateUserByAdminClients,
);

router.param("userId", userById);
router.param("updatedUserId", updatedUserId);

module.exports = router;
