const moment = require('moment');
const uuid = require('uuid/v1');
const db = require("../models");
const Post = db.post;
const User = db.user;
const post = {};

post.create = async(req, res) => {
	let {author} = req.body;
	const postData = new Post({
		...req.body,
		createdAt: moment().format('X'),
	});

	try {
		await postData.save().then(async res => {
			await User.updateOne({ '_id': author }, { $push: {posts: res._id} });
		}).catch(err => {
			console.log(err);
		});

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
			.populate('author', 'fullName email createdAt phone photo')
			.populate('likes', 'fullName email createdAt phone photo')
			.exec();

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
		.populate('author', 'fullName email createdAt phone photo')
		.populate('likes', 'fullName email createdAt phone photo')
		.sort({createdAt: 'descending'})
		.exec();

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

post.like = async(req, res) => {
	let postId = req.body.postId;
	let userId = req.body.userId;
	let isLike = req.body.isLike;

	try {
		if (isLike) await Post.updateOne({ '_id': postId }, { $addToSet: { likes: userId } });
		else await Post.updateOne({ '_id': postId }, { $pull: { likes: userId } });

		res.json({
			status: true,
		});

	} catch (err) {
		console.log(err);
		res.json({
			status: false,
			msg: err,
			errorCode: 'FO00',
		});
	}
};

module.exports = post;