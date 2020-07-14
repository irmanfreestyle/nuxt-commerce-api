const moment = require('moment');
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config.js');
const User = db.user;

const auth = {};

auth.me = async (req, res) => {
	res.json({
			status: true,
			data: req.userData
	});
}

auth.signUp = async(req, res) => {
	let { fullName, email, password, phone } = req.body;

	await User.findOne({ email: req.body.email }).exec()
		.then(async result => {
			if (!result) {
				// CREATE USER HERE
				const user = new User({
					fullName,
					email,
					phone,
					password: bcrypt.hashSync(password, 8),
					createdAt: moment().format('X'),
				});

				try {
					await user.save();
					res.json({
						status: true,
						msg: 'SignUp Success',
					});
				} catch (err) {
					console.log(err);
					res.json({
						status: false,
						msg: err,
						errorCode: 'SU00',
					});
				}
			} else {
				res.json({
					status: false,
					msg: 'Email is exist',
					errorCode: 'SU01',
				});
			}
		})
		.catch(err => {
			console.log(err)
			res.json({
				status: false,
				msg: err,
				errorCode: 'SU03',
			});
		});
}


auth.signIn = async(req, res) => {
	let { email, password } = req.body;

	try {
		await User.findOne({ email }).then(user => {
			if (user) {
				let validPassword = bcrypt.compareSync(password, user.password);
				if (validPassword) {
					let payload = {
						...user._doc
					};

					let token = jwt.sign( payload, SECRET, { expiresIn: '7d' });
					res.json({
						status: true,
						...payload,
						token,
					});

				} else {
					res.json({
						status: false,
						msg: 'Invalid password',
						errorCode: 'SI02',
					});
				}
			} else {
				res.json({
					status: false,
					msg: 'User not found',
					errorCode: 'SI02',
				});
			}
		}).catch(err => {
			console.log(err);
			res.json({
				status: false,
				msg: err,
				errorCode: 'SI03',
			});
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: false,
			msg: err,
			errorCode: 'SI01',
		});
	}
}

module.exports = auth;