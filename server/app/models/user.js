const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserScheme = new Schema({
  fullName: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "default-avatar.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});
module.exports = mongoose.model("users", UserScheme);
