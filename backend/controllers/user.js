const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({message: "User is not authorized"});
  }
};

function generateToken(id) {
  return jwt.sign({id}, process.env.SECRET_TOKEN, {expiresIn: "30d"});
}

const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    var userData = await User.findOne({email});
    if (userData) {
      var isPasswordCorrect = await bcrypt.compare(password, userData.password);
      if (isPasswordCorrect) {
        const token = generateToken(userData._id);
        return res.status(200).json({
          username: userData.username,
          email: userData.email,
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
};

const signup = async (req, res) => {
  const {username, email, password} = req.body;
  const newpassword = await bcrypt.genSaltSync(10);
  console.log(req.body);
  const user_exists = await User.findOne({username});
  if (user_exists) {
    return res.status(400).json({message: "user already exists"});
  }
  const hashedPassword = await bcrypt.hashSync(password, newpassword);
  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.json(userData);
  } catch (err) {
    res.json({message: "something went wrong"});
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete(req.params.id);
    res.json({message: "deleted"});
  } catch (err) {
    res.json({message: "something went wrong"});
  }
};

module.exports = {
  getUser,
  login,
  signup,
  updateUser,
  deleteUser,
};
