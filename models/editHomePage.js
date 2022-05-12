/** @format */

const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
	{
		categoryStatus: {
			type: Boolean,
			default: true,
		},

		thumbnail: {
			type: Array,
		},
		thumbnail2: {
			type: Array,
		},
		thumbnail3: {
			type: Array,
		},
		hyper_link: {
			type: String,
		},
		hyper_link2: {
			type: String,
		},
		hyper_link3: {
			type: String,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("HomePage", homeSchema);
