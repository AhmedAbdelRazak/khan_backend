/** @format */

const mongoose = require("mongoose");

const storeManagement = new mongoose.Schema(
	{
		defaultTicketQty: {
			type: Number,
			trim: true,
			maxlength: 32,
		},

		addStoreLogo: {
			type: Array,
		},
		addStoreName: {
			type: String,
			trim: true,
			maxlength: 60,
		},
		daysStoreClosed: {
			type: Array,
			trim: true,
		},
		datesStoreClosed: {
			type: Array,
			trim: true,
		},

		deposit: {
			type: Number,
			trim: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("StoreManagement", storeManagement);
