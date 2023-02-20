const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

// * register route

userRouter.post("/register", async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	try {
		let user = await UserModel.find({ email });
		if (user.length > 0) {
			res.send("User already exist, please login");
		} else {
			bcrypt.hash(password, 5, async (err, hash) => {
				if (err) res.send(err);
				else {
					const user = new UserModel({ ...req.body, password: hash });
					await user.save();
					res.send(`${email} has been registered successfully`);
				}
			});
		}
	} catch (error) {
		res.send(error);
	}
});

// * login route
userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	let user = await UserModel.find({ email });
	if (user.length > 0) {
		bcrypt.compare(password, user[0].password, (err, result) => {
			if (err) res.send(err);
			else if (result) {
				const token = jwt.sign(
					{ email: user[0].email },
					process.env.JWT_SECRET
				);
				res.send(token);
			} else {
				res.send("Please check your password");
			}
		});
	} else {
		res.send("Please check your email address");
	}
});

module.exports = userRouter;
