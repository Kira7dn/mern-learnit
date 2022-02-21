const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  target: {
    type: "string",
  },
  deadline: {
    type: "date",
  },
  status: {
    type: "string",
    enum: ["doing", "done", "to do"],
  },
  rank: {
    type: "number",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  progress: {
    type: "number",
  },
  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: "projects",
    },
  ],
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "projects",
    },
  ],
  space: [
    {
      type: Schema.Types.ObjectId,
      ref: "spaces",
    },
  ],
});
module.exports = mongoose.model("projects", ProjectSchema);
