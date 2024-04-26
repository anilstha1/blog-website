const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users.js");
const blogs = require("./routes/blogs.js");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);
app.use(express.json());
app.use(cors());

app.listen(8000);

app.use("/user", users);
app.use("/user/blog", blogs);
