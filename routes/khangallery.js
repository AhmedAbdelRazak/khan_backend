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
	GalleryById,
} = require("../controllers/khangallery");

// routes
router.post("/gallery/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/galleries", list);
router.delete(
	"/gallery/:galleryId/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	remove,
);

router.param("userId", userById);
router.param("galleryId", GalleryById);

module.exports = router;
