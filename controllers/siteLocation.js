/** @format */

const Locations = require("../models/siteLocation");

exports.locatioById = (req, res, next, id) => {
	Locations.findById(id).exec((err, location) => {
		if (err || !location) {
			return res.status(400).json({
				error: "location was not found",
			});
		}
		req.location = location;
		next();
	});
};

// create, remove, list

// exports.create = async (req, res) => {
//   try {
//     // console.log(req.body);
//     // return;
//     const { name, expiry, discount } = req.body;
//     res.json(await new Locations({ name, expiry, discount }).save());
//   } catch (err) {
//     console.log(err);
//   }
// };
exports.create = (req, res) => {
	const location = new Locations(req.body);
	location.save((err, data) => {
		if (err) {
			return res.status(400).json({
				err: "Error in location creation",
			});
		}
		res.json({ data });
		console.log(data);
	});
};
exports.remove = (req, res) => {
	const location = req.location;

	location.remove((err, data) => {
		if (err) {
			return res.status(400).json({
				err: "error while removing",
			});
		}
		res.json({ message: "Category deleted" });
	});
};

// exports.remove = async (req, res) => {
//   try {
//     res.json(await Locations.findByIdAndDelete(req.params.locationId).exec());
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.list = async (req, res) => {
	try {
		res.json(await Locations.find({}).sort({ createdAt: -1 }).exec());
	} catch (err) {
		console.log(err);
	}
};
