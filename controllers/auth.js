/** @format */

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const expressJwt = require("express-jwt");
const { OAuth2Client } = require("google-auth-library");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const BarbershopName = "Khan Khadija";
const BarbershopWebsite = "http://khankhadija.com/";
const userDashboardLink = "http://khankhadija.com/dashboard";
const contactusPageLink = "http://khankhadija.com/contact";
const supportEmail = "info@infinite-apps.com";
const fromEmail = "noreply@infinite-apps.com";
const defaultEmail = "ahmed.abdelrazak@infinite-apps.com";
const phoneNumber1 = "(999) 222-1111";
const phoneNumber2 = "(999) 222-3322";
const shopAddress = "123 main street, LA, CA";
const shopLogo =
	"https://res.cloudinary.com/infiniteapps/image/upload/v1634425351/Hairsalon/logo_p62voj.png";

exports.signup = async (req, res) => {
	//   console.log("req.body", req.body);
	const { name, email, password } = req.body;
	if (!name) return res.status(400).send("Please fill in your name.");
	if (!password) return res.status(400).send("Please fill in your password.");
	if (password.length < 6)
		return res
			.status(400)
			.json({ error: "Passwords should be 6 characters or more" });
	let userExist = await User.findOne({ email }).exec();
	if (userExist)
		return res.status(400).json({
			error: "User already exists, please try a different email/phone",
		});

	const user = new User(req.body);

	console.log(req.body, "req.body");
	await user.save(() => {
		user.salt = undefined;
		user.hashed_password = undefined;
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		res.cookie("t", token, { expire: "1d" });

		res.json({
			user,
		});

		if (email.includes("@")) {
			const welcomingEmail = {
				to: user.email,
				from: fromEmail,
				subject: `Welcome to ${BarbershopName}`,
				html: `
				<html>
		<head>
		  <title></title>
						
		</head>
		<body style=margin-left:20px;margin-right:20px;margin-top:50px;background:#f2f2f2;border-radius:20px;padding:50px;>
		 <div >
			  Hi ${user.name},
			  <br />
				<div>Thank you for registering with <a href=${BarbershopWebsite}> ${BarbershopName}</a>.</div>
				<h4> Our team will always be avaiable for you if you have any inquiries or need assistance!!</h4>
				 <br />
				 You can always visit your <a href=${userDashboardLink}> dashboard </a> to check on your loyalty points or if you want to check you last appointments
				<br />
				 Kind and Best Regards,  <br />
							 ${BarbershopName} support team <br />
							 Contact Email: ${supportEmail} <br />
							 Phone#: ${phoneNumber1} <br />
							 Landline#: ${phoneNumber2} <br />
							 Address:  ${shopAddress}  <br />
							 &nbsp;&nbsp; <img src=${shopLogo} alt=${BarbershopName} style="height:100px;width:100px;"  />
							 <br />
							 <p>
							 <strong>${BarbershopName}</strong>
							  </p>
							  </div>
							  </body>
	  </html>
	
			`,
			};
			sgMail.send(welcomingEmail);
		}
	});
};

exports.signin = (req, res) => {
	//find the user based on email
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User is Unavailable, Please Register or Try Again!!",
			});
		}
		//if user is found make sure the email and password match
		//create authenticate method in user model
		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: "Email or Password is incorrect, Please Try Again!!",
			});
		}

		//generate a signed token with user id and secret
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		//persist the token as 't' in cookie with expiry date
		res.cookie("t", token, { expire: "1d" });

		//return response with user and token to frontend client
		const { _id, name, email, role, activePoints, activeUser } = user;
		return res.json({
			token,
			user: { _id, email, name, role, activePoints, activeUser },
		});
	});
};

exports.signout = (req, res) => {
	res.clearCookie("t");
	res.json({ message: "User Signed Out" });
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	userProperty: "auth",
	algorithms: ["HS256"],
});

exports.isAuth = (req, res, next) => {
	let user = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!user) {
		return res.status(403).json({
			error: "access denied",
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role !== 1) {
		return res.status(403).json({
			error: "Admin resource! access denied",
		});
	}

	next();
};

exports.isEmployee = (req, res, next) => {
	if (req.profile.role !== 2) {
		return res.status(403).json({
			error: "Admin resource! access denied",
		});
	}

	next();
};

exports.isOwner = (req, res, next) => {
	if (req.profile.role !== 3) {
		return res.status(403).json({
			error: "Owner resource! access denied",
		});
	}

	next();
};

exports.isBusStation = (req, res, next) => {
	if (req.profile.role !== 7) {
		return res.status(403).json({
			error: "Owner resource! access denied",
		});
	}

	next();
};

exports.isKitchen = (req, res, next) => {
	if (req.profile.role !== 4) {
		return res.status(403).json({
			error: "Owner resource! access denied",
		});
	}

	next();
};

exports.isInStore = (req, res, next) => {
	if (req.profile.role !== 3) {
		return res.status(403).json({
			error: "Admin resource! access denied",
		});
	}

	next();
};

exports.forgotPassword = (req, res) => {
	const { email } = req.body;

	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User with that email does not exist",
			});
		}

		const token = jwt.sign(
			{ _id: user._id, name: user.name },
			process.env.JWT_RESET_PASSWORD,
			{
				expiresIn: "10m",
			},
		);

		const emailData_Reset = {
			to: email,
			from: fromEmail,
			subject: `Password Reset link`,
			html: `
                <h1>Please use the following link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
                <br />
				 Kind and Best Regards,  <br />
							 ${BarbershopName} support team <br />
							 Contact Email: ${supportEmail} <br />
							 Phone#: ${phoneNumber1} <br />
							 Landline#: ${phoneNumber2} <br />
							 Address:  ${shopAddress}  <br />
							 &nbsp;&nbsp; <img src=${shopLogo} alt=${BarbershopName} style="height:100px;width:100px;"  />
							 <br />
							 <p>
							 <strong>${BarbershopName}</strong>
							  </p>
            `,
		};
		const emailData_Reset2 = {
			to: defaultEmail,
			from: fromEmail,
			subject: `Password Reset link`,
			html: `
		        <h1>user ${email} tried to reset her/his password using the below link</h1>
		        <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
		        <hr />
		        <p>This email may contain sensetive information</p>
		        <p>${process.env.CLIENT_URL}</p>
		         <br />
				 Kind and Best Regards,  <br />
				 ${BarbershopName} support team <br />
				 Contact Email: ${supportEmail} <br />
				 Phone#: ${phoneNumber1} <br />
				 Landline#: ${phoneNumber2} <br />
				 Address:  ${shopAddress}  <br />
				 &nbsp;&nbsp; <img src=${shopLogo} alt=${BarbershopName} style="height:100px;width:100px;"  />
				 <br />
				 <p>
				 <strong>${BarbershopName}</strong>
				  </p>
		    `,
		};

		return user.updateOne({ resetPasswordLink: token }, (err, success) => {
			if (err) {
				console.log("RESET PASSWORD LINK ERROR", err);
				return res.status(400).json({
					error: "Database connection error on user password forgot request",
				});
			} else {
				sgMail.send(emailData_Reset2);
				sgMail
					.send(emailData_Reset)
					.then((sent) => {
						console.log("SIGNUP EMAIL SENT", sent);
						return res.json({
							message: `Email has been sent to ${email}. Follow the instruction to Reset your Password`,
						});
					})
					.catch((err) => {
						console.log("SIGNUP EMAIL SENT ERROR", err);
						return res.json({
							message: err.message,
						});
					});
			}
		});
	});
};

exports.resetPassword = (req, res) => {
	const { resetPasswordLink, newPassword } = req.body;

	if (resetPasswordLink) {
		jwt.verify(
			resetPasswordLink,
			process.env.JWT_RESET_PASSWORD,
			function (err, decoded) {
				if (err) {
					return res.status(400).json({
						error: "Expired link. Try again",
					});
				}

				User.findOne({ resetPasswordLink }, (err, user) => {
					if (err || !user) {
						return res.status(400).json({
							error: "Something went wrong. Try later",
						});
					}

					const updatedFields = {
						password: newPassword,
						resetPasswordLink: "",
					};

					user = _.extend(user, updatedFields);

					user.save((err, result) => {
						if (err) {
							return res.status(400).json({
								error: "Error resetting user password",
							});
						}
						res.json({
							message: `Great! Now you can login with your new password`,
						});
					});
				});
			},
		);
	}
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
	const { idToken } = req.body;

	client
		.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
		.then((response) => {
			// console.log('GOOGLE LOGIN RESPONSE',response)
			const { email_verified, name, email } = response.payload;
			if (email_verified) {
				User.findOne({ email }).exec((err, user) => {
					if (user) {
						const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
							expiresIn: "7d",
						});
						const { _id, email, name, role } = user;
						return res.json({
							token,
							user: { _id, email, name, role },
						});
					} else {
						let password = email + process.env.JWT_SECRET;
						user = new User({ name, email, password });
						user.save((err, data) => {
							if (err) {
								console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
								return res.status(400).json({
									error: "User signup failed with google",
								});
							}
							const token = jwt.sign(
								{ _id: data._id },
								process.env.JWT_SECRET,
								{ expiresIn: "7d" },
							);
							const { _id, email, name, role } = data;
							return res.json({
								token,
								user: { _id, email, name, role },
							});
						});
						const welcomingEmail = {
							to: user.email,
							from: fromEmail,
							subject: `Welcome to ${BarbershopName}`,
							html: `
							<html>
					<head>
					  <title></title>
									
					</head>
					<body style=margin-left:20px;margin-right:20px;margin-top:50px;background:#f2f2f2;border-radius:20px;padding:50px;>
					 <div >
						  Hi ${user.name},
						  <br />
							<div>Thank you for registering with <a href=${BarbershopWebsite}> ${BarbershopName}</a>.</div>
							<h4> Our team will always be avaiable for you if you have any inquiries or need assistance!!</h4>
							 <br />
							 You can always visit your <a href=${userDashboardLink}> dashboard </a> to check on your loyalty points or if you want to check you last appointments
							<br />
							 Kind and Best Regards,  <br />
										 ${BarbershopName} support team <br />
										 Contact Email: ${supportEmail} <br />
										 Phone#: ${phoneNumber1} <br />
										 Landline#: ${phoneNumber2} <br />
										 Address:  ${shopAddress}  <br />
										 &nbsp;&nbsp; <img src=${shopLogo} alt=${BarbershopName} style="height:100px;width:100px;"  />
										 <br />
										 <p>
										 <strong>${BarbershopName}</strong>
										  </p>
										  </div>
										  </body>
				  </html>
				
						`,
						};
						sgMail.send(welcomingEmail);
					}
				});
			} else {
				return res.status(400).json({
					error: "Google login failed. Try again",
				});
			}
		});
};
