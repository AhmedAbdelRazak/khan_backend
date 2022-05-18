/** @format */

const mongoose = require("mongoose");

const khanGallerySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: "Name is required",
		},

		title_Arabic: {
			type: String,
			trim: true,
			required: "Name is required",
		},

		thumbnail: {
			type: Array,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Gallery", khanGallerySchema);
