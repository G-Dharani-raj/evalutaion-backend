const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to the DB");
	} catch (error) {
		console.log("Error connecting to the DB", error);
	}
};

module.exports = connectDB;
