/** @format */

const Reservation = require("../models/reservation");
require("dotenv").config();
const SMS = require("../models/sms");
const orderStatusSMS = require("twilio")(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const BusinessName = "Khan Khadija Resort";
const BusinessWebsite = "http://khankhadija.com";
const AdminDashboard = "http://khankhadija.com";
const fromEmail = "noreply@infinite-apps.com";
const defaultEmail = "ahmed.abdelrazak@infinite-apps.com";
// const phoneNumber1 = "+13372881836";
const phoneNumber2 = "+19099914386";
const phoneNumber3 = "+201211492941";
const shopAddress =
	"بترو بلاست للصناعات البلاستیكیة، طريق البتروكيماويات طريق الاسكندرية القاهرة الصحراوى";
const shopLogo =
	"https://res.cloudinary.com/infiniteapps/image/upload/v1652478256/khankhadija/1652478256239.png";

exports.reservationById = (req, res, next, id) => {
	Reservation.findById(id).exec((err, order) => {
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
	const order = new Reservation(req.body);

	// console.log(order);
	console.log(`+${order.phoneNumber}`, "phone");
	// console.log(`${order._id}`, "Id");
	const smsData = {
		phone: `+${order.phoneNumber}`,
		text: `Hi ${order.fullName} - \nYour Ticket was successfully booked \n Please call ${phoneNumber3} to confirm.\n Thank you for choosing ${BusinessName}`,
	};

	const smsDataForAdmin = {
		phone: `${phoneNumber3}`,
		text: `Hi Admin - \nThere is a new client has filled in the form in your website (Khan Khadija). Please check your dashboard for more details and reach out to the client in case he/she doesn't \nCustomerPhone: +${order.phoneNumber}\nCustomerName: ${order.fullName} \n Dashboard: ${AdminDashboard}`,
	};

	order.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: console.log(err, "error while creating order"),
			});
		}
		const sms = new SMS(smsData);
		sms.save((err, data) => {
			if (err) {
				console.log(err, "from creating SMSData");
				return res.status(400).json({
					err: "Error in sms creation",
				});
			}
			console.log(data, "sms saved in the data base");
		});

		orderStatusSMS.messages
			.create({
				body: smsData.text,
				from: "+19094884148",
				to: smsData.phone,
			})
			.then((message) =>
				console.log(`Your message was successfully sent to ${smsData.phone}`),
			)
			.catch((err) => console.log(err));

		const smsForAdmin = new SMS(smsDataForAdmin);
		smsForAdmin.save((err, data) => {
			if (err) {
				return res.status(400).json({
					err: "Error in sms creation",
				});
			}
			console.log(data, "sms saved in the data base");
		});

		orderStatusSMS.messages
			.create({
				body: smsDataForAdmin.text,
				from: "+19094884148",
				to: smsDataForAdmin.phone,
			})
			.then((message) =>
				console.log(
					`Your message was successfully sent to ${smsDataForAdmin.phone}`,
				),
			)
			.catch((err) => console.log(err));

		res.json({ data });

		const FormSubmittionEmail = {
			to: order.scheduledByUserEmail,
			from: fromEmail,
			subject: `${BusinessName} - Booking Confirmation`,
			html: `
      <html>
      <head>
        <title></title>
            
      </head>
      <body style=margin-left:15px;margin-right:5px;margin-top:50px;background:#f2f2f2;border-radius:20px;padding:50px;>
       <div >
          Hi ${order.fullName},
          <br />
          <br />
            <div>Thank you for choosing <a href=${BusinessWebsite}> ${BusinessName}</a>.</div>
           
             If you would like to change your ticket info, Please call ${phoneNumber3} and our support team will help you.
             <br />
             <br />
			 <div>
				Your Booking Info:
				<br />
				Phone: ${order.phoneNumber}
				<br />
				Scheduled Date: ${new Date(order.scheduledDate).toLocaleDateString()}
				<br />
				Tickets Count (Adults): ${order.quantity}
				<br />
				Tickets Count (Children): ${order.quantity_Children}
				<br />
				Bus Station Address ${order.chosenBusStation.address}
				<br />
				Chosen Package/Ticket: ${order.chosenService_Package}
				<br />
				Total Amount: ${order.totalAmount} L.E
			<br />
			<br />
			<br />
			 </div>
             Kind and Best Regards,  <br />
						 ${BusinessName} support team <br />
						 Contact Email: ${defaultEmail} <br />
						 Phone#: ${phoneNumber3} <br />
						 Address:  ${shopAddress}  <br />
						 &nbsp;&nbsp; <img src=${shopLogo} alt=${BusinessName} style="height:80px;width:250px;"  />
						 <br />
						 <p>
						 <strong>${BusinessName}</strong>
						  </p>
						  </div>
    </body>
  </html>
        `,
		};
		sgMail.send(FormSubmittionEmail);
	});
};

exports.read = (req, res) => {
	return res.json(req.order);
};

exports.list = (req, res) => {
	Reservation.find().exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.listToBook = (req, res) => {
	Reservation.find()
		.sort("-created")
		.exec((err, orders) => {
			if (err) {
				return res.status(400).json({
					error: "Error to retrieve all orders",
				});
			}
			var ordersModified = orders.filter(
				(i) =>
					new Date(i.scheduledDate).setHours(0, 0, 0, 0) >=
					new Date().setHours(0, 0, 0, 0),
			);
			res.json(
				ordersModified.map((i) => {
					return {
						_id: i._id,
						scheduledDate: i.scheduledDate,
						chosenPackage_Stock: i.chosenPackage_Stock,
						quantity: i.quantity,
						quantity_Children: i.quantity_Children,
						status: i.status,
						fullName: i.fullName,
						scheduledByUserEmail: i.scheduledByUserEmail,
						totalAmount: i.totalAmount,
						createdAt: i.createdAt,
					};
				}),
			);
		});
};

exports.getStatusValues = (req, res) => {
	res.json(Reservation.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
	Reservation.updateOne(
		{ _id: req.body.orderId },
		{ $set: { status: req.body.status } },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}

			console.log(req.order, "order");

			const emailData3 = {
				to: req.order.scheduledByUserEmail,
				from: "noreply@infinite-apps.com",
				subject: `Khan Khadija | Reservation Update`,
				html: `<div>Hi ${req.order.fullName}, </div>
        <br />
        <p>There is an update to your reservation.</p>
        <br />
              <h4>Reservation status: ${req.body.status}</h4>

              Once we have another update, we will let you know.

              <h4> <div>Thank you for choosing <a href=${BusinessWebsite}> ${BusinessName}</a>.</div><h4/>

			  <br />
			  <br />
			   </div>
			   Kind and Best Regards,  <br />
						   ${BusinessName} support team <br />
						   Contact Email: ${defaultEmail} <br />
						   Phone#: ${phoneNumber3} <br />
						   Address:  ${shopAddress}  <br />
						   &nbsp;&nbsp; <img src=${shopLogo} alt=${BusinessName} style="height:80px;width:250px;"  />
						   <br />
						   <p>
						   <strong>${BusinessName}</strong>
							</p>
							</div>

        `,
			};

			sgMail.send(emailData3);
			res.json(order);

			const smsDataForAdmin = {
				phone: `+19512591528`,
				text: `Hi Admin - \nThere is an update in client's reservation (Khan Khadija). Please check your dashboard for more details and reach out to the client in case he/she doesn't \nCustomerPhone: +${req.order.scheduledByUserEmail}\nCustomerName: ${req.order.fullName} \n Dashboard: ${AdminDashboard}`,
			};

			const smsForAdmin = new SMS(smsDataForAdmin);
			smsForAdmin.save((err, data) => {
				if (err) {
					return res.status(400).json({
						err: "Error in sms creation",
					});
				}
				console.log(data, "sms saved in the data base");
			});

			orderStatusSMS.messages
				.create({
					body: smsDataForAdmin.text,
					from: "+19094884148",
					to: smsDataForAdmin.phone,
				})
				.then((message) =>
					console.log(
						`Your message was successfully sent to ${smsDataForAdmin.phone}`,
					),
				)
				.catch((err) => console.log(err));
		},
	);
};

exports.updateOrderScheduleDate = (req, res) => {
	Reservation.updateOne(
		{ _id: req.body.orderId },
		{ $set: { date: req.body.scheduledDate } },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}

			console.log(req.order, "order");

			res.json(order);
		},
	);
};
