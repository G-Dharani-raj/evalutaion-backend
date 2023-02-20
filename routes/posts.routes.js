const express = require("express");
const mongoose = require("mongoose");
const PostModel = require("../models/Posts.model");

const postRouter = express.Router();

// * getting all the posts of the user

postRouter.get("/", async (req, res) => {
	const { email } = req.body;
	const { device, device1, device2 } = req.query;
	let tmp = { email };
	if (device) {
		tmp = { ...tmp, device: { $regex: device, $options: "i" } };
	} else if (device1 && device2) {
		tmp = {
			...tmp,
			$or: [
				{
					device: { $regex: device1, $options: "i" },
				},
				{ device: { $regex: device2, $options: "i" } },
			],
		};
	}
	try {
		const posts = await PostModel.find(tmp);
		res.send(posts);
	} catch (error) {
		res.send(error);
	}
});

// * top post with comments

postRouter.get("/top", async (req, res) => {
	const { email } = req.body;
	try {
		const post = await PostModel.find({ email })
			.sort({ no_if_comments: -1 })
			.limit(1);
		res.send(post);
	} catch (error) {
		res.send(error);
	}
});

// * postin a new post

postRouter.post("/create", async (req, res) => {
	console.log(req.body);
	try {
		const newPost = new PostModel(req.body);
		await newPost.save();
		res.send("Post created successfully");
	} catch (error) {
		res.send(error);
	}
});

// * updating the post
postRouter.patch("/update/:id", async (req, res) => {
	let id = req.params.id;

	try {
		await PostModel.findByIdAndUpdate(id, req.body);
		res.send("updated successfully");
	} catch (error) {
		res.send(error);
	}
});

postRouter.delete("/delete/:id", async (req, res) => {
	let id = req.params.id;
	try {
		await PostModel.findByIdAndDelete(id);
		res.send("deleted successfully");
	} catch (error) {
		res.send(error);
	}
});

module.exports = postRouter;
