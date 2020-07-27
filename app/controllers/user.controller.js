const moment = require('moment');
const uuid = require('uuid/v1');
const db = require("../models");
const User = db.user;
const user = {};

user.loadProfile = async(req, res) => {
	let userId = req.params.userId;

	try {
		let user = await User.findOne({'_id': userId}, {password: 0})
			.populate('posts')
			.exec();

		res.json({
			status: true,
			data: user,
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: false,
			msg: err,
			errorCode: 'LU00',
		});
	}
};

module.exports = user;