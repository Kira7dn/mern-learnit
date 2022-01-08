const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const friendsSchema = new Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "users" },
    recipient: { type: Schema.Types.ObjectId, ref: "users" },
    status: {
      type: Number,
      enums: [
        0, //'requested',
        1, //'friends',
        2, //'rejected',
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("friends", friendsSchema);
