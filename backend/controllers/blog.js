const User = require("../models/user.js");
const Blog = require("../models/blog.js");

const getBlog = async (req, res) => {
  try {
    const {id} = req.params;
    const blog = await Blog.findById(id).populate("user", {name: 1});
    console.log(blog);
    res.status(200).json(blog);
  } catch (err) {
    res.status(401).json({message: "not authorized"});
  }
};

const getAllblogs = async (req, res) => {
  try {
    blogdata = await Blog.find().populate("user", {username: 1});
    console.log(blogdata);
    res.json(blogdata);
  } catch (err) {
    res.status(401).json({message: "not authorized"});
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({user: req.userId});
    console.log(blogs);
    res.status(200).json(blogs);
  } catch (err) {
    res.status(401).json({message: "not authorized"});
  }
};

const addBlog = async (req, res) => {
  console.log(req.body);
  const {title, description} = req.body;
  try {
    const newBlog = new Blog({
      user: req.userId,
      title,
      description,
    });
    const savedBlog = await newBlog.save();
    const user = await User.findById(req.userId);
    user.blogs.push(savedBlog._id);
    await user.save();
    res.status(200).json(savedBlog);
  } catch (err) {
    res.status(400).json({message: err});
  }
};

const updateBlog = async (req, res) => {
  try {
    const {title, description} = req.body;
    const blog = await Blog.findById(req.params.id);
    if (blog.user != req.user) {
      res.json({message: "User is not authenticated"});
    }
    blog.title = title;
    blog.description = description;
    const updatedblog = await blog.save();

    res.json(updatedblog);
  } catch (err) {
    res.json({message: "something went wrong"});
  }
};

const deleteBlog = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const index = user.blogs.indexOf(req.params.id);
    user.blogs.splice(index, 1);
    await user.save();
    await Blog.findByIdAndDelete(req.params.id);

    res.json({message: "post deleted"});
  } catch (err) {
    res.json({message: "something went wrong"});
  }
};
module.exports = {
  getBlog,
  getAllblogs,
  getUserBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
};
