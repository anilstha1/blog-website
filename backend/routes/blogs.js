const express = require("express");
const blogs = express.Router();
const verifyUser = require("../middleware.js");
const {
  getBlog,
  getAllblogs,
  getUserBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.js");

//get blog
blogs.get("/get/:id", getBlog);
// get blogs
blogs.get("/getblogs", getAllblogs);

// get blogs
blogs.get("/get", verifyUser, getUserBlogs);

// add blogs
blogs.post("/add", verifyUser, addBlog);

blogs.put("/:id", verifyUser, updateBlog);

blogs.delete("/:id", verifyUser, deleteBlog);
module.exports = blogs;
