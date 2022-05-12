/** @format */

const TicketsManagement = require("../models/ticketManagement");

exports.ticketManagementById = (req, res, next, id) => {
	TicketsManagement.findById(id).exec((err, ticketManagement) => {
		if (err || !ticketManagement) {
			return res.status(400).json({
				error: "ticketmanagement was not found",
			});
		}
		req.ticketManagement = ticketManagement;
		next();
	});
};

exports.create = (req, res) => {
	const ticketManagement = new TicketsManagement(req.body);
	ticketManagement.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: console.log(err, "error while creating ticketManagement"),
			});
		}
		res.json({ data });
	});
};

exports.read = (req, res) => {
	ticketManagement;
	return res.json(req.ticketManagement);
};

exports.update = (req, res) => {
	console.log(req.ticketManagement);
	const ticketManagement = req.ticketManagement;
	ticketManagement.StockDate = req.body.StockDate;
	ticketManagement.ticket = req.body.ticket;
	ticketManagement.TicketAmount = req.body.TicketAmount;

	ticketManagement.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.remove = (req, res) => {
	const ticketManagement = req.ticketManagement;

	ticketManagement.remove((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({ message: "ticketManagement deleted" });
	});
};
exports.list = (req, res) => {
	TicketsManagement.find()
		.populate("ticket", "_id serviceName servicePrice servicePriceDiscount")
		.exec((err, data) => {
			if (err) {
				return res.status(400).json({
					error: err,
				});
			}
			res.json(data);
		});
};
