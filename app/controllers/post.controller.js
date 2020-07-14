const moment = require('moment');
const uuid = require('uuid/v1');
const db = require("../models");
const Post = db.post;
const post = {};

post.create = async(req, res) => {
	const postData = new Post({
		...req.body,
		createdAt: moment().format('X'),
	});

	try {
		await postData.save();
		res.json({
			status: true,
			msg: 'Post created',
			id: postData._id,
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: false,
			msg: err,
			errorCode: 'P00',
		});
	}
};

post.findOne = async(req, res) => {
	let postid = req.params.postid;

	try {
		let post = await Post.findOne({'_id': postid})
			.populate('author', 'fullName email createdAt phone photo').exec();

		res.json({
			status: true,
			data: post,
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: false,
			msg: err,
			errorCode: 'FO00',
			data: [],
		});
	}
};

post.load = async(req, res) => {
	try {
		let posts = await Post.find({})

		res.json({
			status: true,
			data: posts,
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: false,
			msg: err,
			errorCode: 'FO00',
			data: [],
		});
	}
};

module.exports = post;