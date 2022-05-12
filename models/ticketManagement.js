/** @format */

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ticketManagement = new mongoose.Schema(
	{
		StockDate: {
			type: Date,
			trim: true,
		},
		ticket: { type: ObjectId, ref: "Tickets" },

		TicketAmount: {
			type: Number,
			trim: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("TicketsManagement", ticketManagement);
