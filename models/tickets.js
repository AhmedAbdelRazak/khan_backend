/** @format */

const mongoose = require("mongoose");

const ticketsSchema = new mongoose.Schema(
	{
		serviceName: {
			type: String,
			trim: true,
			lowercase: true,
		},

		serviceName_Arabic: {
			type: String,
			trim: true,
		},

		serviceDescription: {
			type: String,
			trim: true,
			lowercase: true,
		},
		serviceDescription_Arabic: {
			type: String,
			trim: true,
		},

		serviceDescription2: {
			type: String,
			trim: true,
			lowercase: true,
		},

		serviceDescription2_Arabic: {
			type: String,
			trim: true,
		},

		serviceDescription3: {
			type: String,
			trim: true,
			lowercase: true,
		},

		serviceDescription3_Arabic: {
			type: String,
			trim: true,
		},

		serviceDescription4: {
			type: String,
			trim: true,
			lowercase: true,
		},

		serviceDescription4_Arabic: {
			type: String,
			trim: true,
		},

		serviceDescription5: {
			type: String,
			trim: true,
			lowercase: true,
			default: "Not Added",
		},

		serviceDescription5_Arabic: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		serviceDescription6: {
			type: String,
			trim: true,
			lowercase: true,
			default: "Not Added",
		},
		serviceDescription6_Arabic: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		serviceDescription7: {
			type: String,
			trim: true,
			lowercase: true,
			default: "Not Added",
		},

		serviceDescription7_Arabic: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		serviceDescription8: {
			type: String,
			trim: true,
			lowercase: true,
			default: "Not Added",
		},

		serviceDescription8_Arabic: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		serviceDescription9: {
			type: String,
			trim: true,
			lowercase: true,
			default: "Not Added",
		},

		serviceDescription9_Arabic: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		serviceDescription10: {
			type: String,
			trim: true,
			lowercase: true,
			default: "Not Added",
		},

		serviceDescription10_Arabic: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		servicePrice: {
			type: Number,
			trim: true,
			default: 100,
		},

		servicePriceDiscount: {
			type: Number,
			trim: true,
			default: 100,
		},

		servicePrice_Children: {
			type: Number,
			trim: true,
			default: 100,
		},

		servicePriceDiscount_Children: {
			type: Number,
			trim: true,
			default: 100,
		},

		serviceLoyaltyPoints: {
			type: Number,
			trim: true,
			default: 10,
		},

		activeService: {
			type: Boolean,
			trim: true,
			default: true,
		},

		thumbnail: {
			type: Array,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Tickets", ticketsSchema);
