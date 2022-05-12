/** @format */

const User = require("../models/user");

exports.userById = (req, res, next, id) => {
	User.findById(id)
		.select("_id name email role user points activePoints likesUser activeUser")

		.exec((err, user) => {
			if (err || !user) {
				return res.status(400).json({
					error: "user not found yad",
				});
			}
			req.profile = user;
			next();
		});
};

exports.updatedUserId = (req, res, next, id) => {
	User.findById(id)
		.select("_id name email role user points activePoints likesUser activeUser")

		.exec((err, userNeedsUpdate) => {
			if (err || !userNeedsUpdate) {
				return res.status(400).json({
					error: "user not found yad",
				});
			}
			req.updatedUserByAdmin = userNeedsUpdate;
			next();
		});
};

exports.read = (req, res) => {
	req.profile.hashed_password = undefined;
	req.profile.salt = undefined;
	return res.json(req.profile);
};

exports.remove = (req, res) => {
	let user = req.user;
	user.remove((err, deletedUser) => {
		if (err) {
			return res.status(400).json({
				error: console.log(err, "err remove"),
			});
		}
		res.json({
			manage: "User was successfully deleted",
		});
	});
};
exports.allUsersList = (req, res) => {
	User.find()
		.select(
			"_id name email role user points activePoints likesUser activeUser history createdAt relatedSite",
		)
		.populate("relatedSite", "_id address comment")
		.exec((err, users) => {
			if (err) {
				return res.status(400).json({
					error: "users not found",
				});
			}
			res.json(users);
		});
};

exports.update = (req, res) => {
	// console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
	const { name, password, email } = req.body;
	console.log(req.body);
	User.findOne({ _id: req.profile._id }, (err, user) => {
		console.log(user, "from begining");
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		if (!name) {
			return res.status(400).json({
				error: "Name is required",
			});
		} else {
			user.name = name;
		}

		if (!email) {
			return res.status(400).json({
				error: "Email is required",
			});
		} else {
			user.email = email;
		}

		if (password) {
			if (password.length < 6) {
				return res.status(400).json({
					error: "Password should be min 6 characters long",
				});
			} else {
				user.password = password;
			}
		}

		user.save((err, updatedUser) => {
			console.log(updatedUser, "from updateuser");
			if (err) {
				console.log("USER UPDATE ERROR", err);
				return res.status(400).json({
					error: "User update failed",
				});
			}
			updatedUser.hashed_password = undefined;
			updatedUser.salt = undefined;
			res.json(updatedUser);
		});
	});
};

exports.updateUserByAdmin = (req, res) => {
	console.log(req.params.updatedUserId, "IdOfUserUpdated");
	console.log(req.params.userId, "ofAdmin");
	console.log(req.body);
	console.log(req.body.activeUser, "ActiveUser");
	console.log(req.user);
	console.log(req.updatedUserByAdmin, "req.updatedUserByAdmin");
	const updatedUserByAdmin = req.updatedUserByAdmin;
	updatedUserByAdmin.name = req.body.name;
	updatedUserByAdmin.activeUser = req.body.activeUser;
	updatedUserByAdmin.password = req.body.password;
	updatedUserByAdmin.email = req.body.email;
	updatedUserByAdmin.save((err, data) => {
		if (err) {
			console.log(err);
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
		console.log(data);
	});
};

exports.updateUserByAdminClients = (req, res) => {
	User.updateOne(
		{ _id: req.body.clientUserId },
		{
			$set: {
				activeUser: req.body.activeUser,
			},
		},
		(err, user) => {
			if (err) {
				return res.status(400).json({
					err: "Error to update user status",
				});
			}

			res.json(user);
		},
	);
};
