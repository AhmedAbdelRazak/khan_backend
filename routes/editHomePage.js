/** @format */

const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const {
	create,
	homeById,
	read,
	update,
	list,
} = require("../controllers/editHomePage");

router.get("/home/:homeId", read);

router.post("/home/create/:userId", requireSignin, isAuth, isAdmin, create);

router.put("/home/:homeId/:userId", requireSignin, isAuth, isAdmin, update);

router.get("/home", list);

router.param("userId", userById);
router.param("homeId", homeById);

module.exports = router;
