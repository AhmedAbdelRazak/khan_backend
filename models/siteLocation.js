/** @format */

const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
	{
		address: {
			type: String,
			trim: true,
			required: "Name is required",
		},

		address_Arabic: {
			type: String,
			trim: true,
			required: "Address Arabic is required",
		},

		comment: {
			type: String,
			requred: true,
		},
		sitePhone: {
			type: String,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Locations", locationSchema);
