/** @format */

const mongoose = require("mongoose");

const busStationSchema = new mongoose.Schema(
	{
		address: {
			type: String,
			trim: true,
			uppercase: true,
			required: "Nmae is required",
			minlength: [6, "Too short"],
			maxlength: [25, "Too long"],
		},
		times: {
			type: Array,
			required: true,
		},
		price: {
			type: Number,
			requred: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("BusStation", busStationSchema);
