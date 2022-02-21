const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SpaceSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  image: {
    type: "string",
    default: "default-space.jpg",
  },
  rank: {
    type: "number",
    enum: [1, 2, 3, 4, 5],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "friends",
    },
  ],
  projects: {
    type: Schema.Types.ObjectId,
    ref: "projects",
  },
});
module.exports = mongoose.model("spaces", SpaceSchema);
