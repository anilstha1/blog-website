const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  username: {
    type: String,
    required: true,
  },
  password: {type: String, required: true},
  blogs: [{type: mongoose.Schema.Types.ObjectId, ref: "blogs", required: true}],
});
var User = mongoose.model("users", UserSchema);
module.exports = User;
