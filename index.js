const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/user.routes");
const authenticate = require("./middleware/authenticate.middleware");
const postRouter = require("./routes/posts.routes");
require("dotenv").config();
app.use(cors());
app.use(express.json());

// * user routes
app.use("/users", userRouter);
// * authenticator
app.use("/posts", authenticate);

// * posts routes
app.use("/posts", postRouter);

app.get("/", (req, res) => {
	res.setEncoding("Home page");
});

app.listen(process.env.PORT, () => {
	connectDB();
	console.log("listening on port " + process.env.PORT);
});
