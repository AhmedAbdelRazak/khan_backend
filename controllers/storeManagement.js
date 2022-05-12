/** @format */

const StoreManagement = require("../models/storeManagement");

exports.StoreManagementById = (req, res, next, id) => {
	StoreManagement.findById(id).exec((err, store_management) => {
		if (err || !store_management) {
			return res.status(400).json({
				error: "store_management was not found",
			});
		}
		req.store_management = StoreManagement;
		next();
	});
};

exports.create = (req, res) => {
	const store_management = new StoreManagement(req.body);
	store_management.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({ data });
	});
};

exports.read = (req, res) => {
	return res.json(req.store_management);
};

exports.list = (req, res) => {
	StoreManagement.find().exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};
