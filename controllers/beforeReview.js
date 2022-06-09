/** @format */

const BeforeReview = require("../models/beforeReview");
require("dotenv").config();
const SMS = require("../models/sms");
const orderStatusSMS = require("twilio")(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.reservationById = (req, res, next, id) => {
	BeforeReview.findById(id).exec((err, order) => {
		if (err || !order) {
			return res.status(400).json({
				error: "order was not found",
			});
		}
		req.order = order;
		next();
	});
};

exports.create = (req, res) => {
	const order = new BeforeReview(req.body);

	// console.log(order);
	// console.log(`${order._id}`, "Id");

	order.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: console.log(err, "error while creating a before view schema"),
			});
		}

		res.json({ data });
	});
};

exports.list = (req, res) => {
	BeforeReview.find().exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};
