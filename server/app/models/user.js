const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserScheme = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "friends",
    },
  ],
});
module.exports = mongoose.model("users", UserScheme);
