/** @format */

const Tickets = require("../models/tickets");

exports.ticketsById = (req, res, next, id) => {
	Tickets.findById(id).exec((err, ticket) => {
		if (err || !ticket) {
			return res.status(400).json({
				error: "ticket was not found",
			});
		}
		req.ticket = ticket;
		next();
	});
};

exports.create = (req, res) => {
	const ticket = new Tickets(req.body);
	ticket.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: console.log(err, "error while creating ticket"),
			});
		}
		res.json({ data });
	});
};

exports.read = (req, res) => {
	ticket;
	return res.json(req.ticket);
};

exports.update = (req, res) => {
	console.log(req.body);
	const ticket = req.ticket;
	ticket.serviceName = req.body.serviceName;
	ticket.serviceName_Arabic = req.body.serviceName_Arabic;
	ticket.serviceDescription = req.body.serviceDescription;
	ticket.serviceDescription_Arabic = req.body.serviceDescription_Arabic;
	ticket.serviceDescription2 = req.body.serviceDescription2;
	ticket.serviceDescription2_Arabic = req.body.serviceDescription2_Arabic;
	ticket.serviceDescription3 = req.body.serviceDescription3;
	ticket.serviceDescription3_Arabic = req.body.serviceDescription3_Arabic;
	ticket.serviceDescription4 = req.body.serviceDescription4;
	ticket.serviceDescription4_Arabic = req.body.serviceDescription4_Arabic;
	ticket.serviceDescription5 = req.body.serviceDescription5;
	ticket.serviceDescription5_Arabic = req.body.serviceDescription5_Arabic;
	ticket.serviceDescription6 = req.body.serviceDescription6;
	ticket.serviceDescription6_Arabic = req.body.serviceDescription6_Arabic;
	ticket.serviceDescription7 = req.body.serviceDescription7;
	ticket.serviceDescription7_Arabic = req.body.serviceDescription7_Arabic;
	ticket.serviceDescription8 = req.body.serviceDescription8;
	ticket.serviceDescription8_Arabic = req.body.serviceDescription8_Arabic;
	ticket.serviceDescription9 = req.body.serviceDescription9;
	ticket.serviceDescription9_Arabic = req.body.serviceDescription9_Arabic;
	ticket.serviceDescription10 = req.body.serviceDescription10;
	ticket.serviceDescription10_Arabic = req.body.serviceDescription10_Arabic;
	ticket.servicePrice = req.body.servicePrice;
	ticket.servicePriceDiscount = req.body.servicePriceDiscount;

	ticket.servicePrice_Children = req.body.servicePrice_Children;
	ticket.servicePriceDiscount_Children = req.body.servicePriceDiscount_Children;
	ticket.option1 = req.body.option1;
	ticket.option2 = req.body.option2;
	ticket.option3 = req.body.option3;
	ticket.option4 = req.body.option4;
	ticket.option1_Arabic = req.body.option1_Arabic;
	ticket.option2_Arabic = req.body.option2_Arabic;
	ticket.option3_Arabic = req.body.option3_Arabic;
	ticket.option4_Arabic = req.body.option4_Arabic;
	ticket.option1_Price = req.body.option1_Price;
	ticket.option2_Price = req.body.option2_Price;
	ticket.option3_Price = req.body.option3_Price;
	ticket.option4_Price = req.body.option4_Price;
	ticket.option1_Active = req.body.option1_Active;
	ticket.option2_Active = req.body.option2_Active;
	ticket.option3_Active = req.body.option3_Active;
	ticket.option4_Active = req.body.option4_Active;
	ticket.displayBusStationOption = req.body.displayBusStationOption;
	ticket.displayOcassion = req.body.displayOcassion;

	ticket.activeService = req.body.activeService;
	ticket.thumbnail = req.body.thumbnail;
	ticket.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.remove = (req, res) => {
	const ticket = req.ticket;

	ticket.remove((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({ message: "Ticket deleted" });
	});
};
exports.list = (req, res) => {
	Tickets.find().exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};
