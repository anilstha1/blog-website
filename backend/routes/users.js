const express = require("express");
const users = express.Router();
const verifyUser = require("../middleware.js");

const {
  getUser,
  login,
  signup,
  updateUser,
  deleteUser,
} = require("../controllers/user.js");

// get user
users.get("/get", verifyUser, getUser);

users.post("/login", login);

// add user
users.post("/signup", signup);

users.put("/:id", verifyUser, updateUser);

users.delete("/:id", verifyUser, deleteUser);

module.exports = users;
