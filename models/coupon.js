/** @format */

const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			uppercase: true,
			required: "Nmae is required",
			minlength: [6, "Too short"],
			maxlength: [35, "Too long"],
		},
		expiry: {
			type: Date,
			required: true,
		},
		discount: {
			type: Number,
			requred: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Coupon", couponSchema);
