/** @format */

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const beforeReviewSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			trim: true,
			lowercase: true,
			default: "Not Added",
		},

		phoneNumber: {
			type: Number,
			trim: true,
		},

		quantity: {
			type: Number,
			trim: true,
		},

		quantity_Children: {
			type: Number,
			trim: true,
		},

		totalAmount: {
			type: Number,
			trim: true,
		},

		totalAmountBeforeDiscount: {
			type: Number,
			trim: true,
		},

		countryCallingCode: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		event: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		appointmentComment: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		scheduledByUserEmail: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		chosenService_Package: {
			type: String,
			trim: true,
			default: "Not Added",
		},

		chosenServiceDetails: {},
		chosenPackage_Stock: {
			type: Object,
			default: {},
		},
		scheduledDate: {},
		bookedFrom: {
			type: String,
			trim: true,
			default: "Online",
		},

		status: {
			type: String,
			default: "Not Paid",
			enum: ["Not Paid", "Partially Paid", "Paid", "Cancelled"], // enum means string objects
		},
		chosenCoupon: {
			type: Object,
			default: {},
		},
		availableCoupon: {
			type: Boolean,
			default: false,
		},

		chosenBusStation: {
			type: Object,
			default: {},
		},
		chosenBusStationTime: {
			type: String,
			default: "No Time",
		},

		bookingSource: {
			type: String,
			default: "Online",
		},

		option1Count: {
			type: Number,
			default: 0,
		},
		option2Count: {
			type: Number,
			default: 0,
		},
		option3Count: {
			type: Number,
			default: 0,
		},
		option4Count: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("BeforeReview", beforeReviewSchema);
