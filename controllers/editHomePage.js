/** @format */

const HomePage = require("../models/editHomePage");

exports.homeById = (req, res, next, id) => {
	HomePage.findById(id).exec((err, home) => {
		if (err || !home) {
			return res.status(400).json({
				error: "home was not found",
			});
		}
		req.home = home;
		next();
	});
};

exports.create = (req, res) => {
	const home = new HomePage(req.body);
	home.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({ data });
	});
};

exports.read = (req, res) => {
	return res.json(req.home);
};

exports.update = (req, res) => {
	console.log(req.body);
	const home = req.home;
	home.thumbnail = req.body.thumbnail;
	home.thumbnail2 = req.body.thumbnail2;
	home.thumbnail3 = req.body.thumbnail3;
	home.hyper_link = req.body.hyper_link;
	home.hyper_link2 = req.body.hyper_link2;
	home.hyper_link3 = req.body.hyper_link3;
	home.categoryStatus = req.body.categoryStatus;

	home.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.list = (req, res) => {
	HomePage.find().exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};
