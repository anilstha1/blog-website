const mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {type: String, required: true},
  },
  {timestamps: true}
);
var Blog = mongoose.model("blogs", BlogSchema);
module.exports = Blog;
