/** @format */

const BusStation = require("../models/busStation");

exports.busStationById = (req, res, next, id) => {
	BusStation.findById(id).exec((err, busStation) => {
		if (err || !busStation) {
			return res.status(400).json({
				error: "busStation was not found",
			});
		}
		req.busStation = busStation;
		next();
	});
};

// create, remove, list

// exports.create = async (req, res) => {
//   try {
//     // console.log(req.body);
//     // return;
//     const { name, expiry, discount } = req.body;
//     res.json(await new BusStation({ name, expiry, discount }).save());
//   } catch (err) {
//     console.log(err);
//   }
// };
exports.create = (req, res) => {
	console.log(req.body, "creation bus station");
	const busStation = new BusStation(req.body);
	busStation.save((err, data) => {
		if (err) {
			return res.status(400).json({
				err: "Error in busStation creation",
			});
		}
		res.json({ data });
		console.log(data);
	});
};
exports.remove = (req, res) => {
	const busStation = req.busStation;

	busStation.remove((err, data) => {
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
//     res.json(await BusStation.findByIdAndDelete(req.params.busStationId).exec());
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.list = async (req, res) => {
	try {
		res.json(await BusStation.find({}).sort({ createdAt: -1 }).exec());
	} catch (err) {
		console.log(err);
	}
};
