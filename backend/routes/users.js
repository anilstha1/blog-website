const express = require("express");
const User = require("../models/user.js");
const verifyUser = require("../authenticate.js");
const users = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// get user
users.get("/get", verifyUser, async (req, res) => {
  try {
    const user = await User.findById(res.user).select("-password");
    console.log(userdata);
    res.status(200).json(userdata);
  } catch (err) {
    res.status(401).json({message: "User is not authorized"});
  }
});

function generateToken(id) {
  return jwt.sign({id}, process.env.SECRET_TOKEN, {expiresIn: "30d"});
}

users.post("/login", async (req, res) => {
  const {username, password} = req.body;
  try {
    var userData = await User.findOne({username});
    if (userData) {
      var isPasswordCorrect = await bcrypt.compare(password, userData.password);
      if (isPasswordCorrect) {
        const token = generateToken(userData._id);
        return res.status(200).json({
          name: userData.name,
          username: userData.username,
          token,
        });
      }
      throw new Error("User is not authorized");
    } else {
      throw new Error("User is not authorized");
    }
  } catch (err) {
    res.status(400).json({message: "Username or Password wrong"});
  }
});

// add user
users.post("/add", async (req, res) => {
  const {name, email, username, password} = req.body;
  const newpassword = await bcrypt.genSaltSync(10);
  console.log(req.body);
  const user_exists = await User.findOne({username});
  if (user_exists) {
    return res.status(400).json({message: "user already exists"});
  }
  const npassword = await bcrypt.hashSync(password, newpassword);
  try {
    const userData = new user({
      name,
      email,
      username,
      password: npassword,
    });
    await userData.save();
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

users.put("/:id", verifyUser, async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.json(userData);
  } catch (err) {
    res.json({message: "something went wrong"});
  }
});

users.delete("/:id", verifyUser, async (req, res) => {
  try {
    await User.findOneAndDelete(req.params.id);
    res.json({message: "deleted"});
  } catch (err) {
    res.json({message: "something went wrong"});
  }
});

module.exports = users;
