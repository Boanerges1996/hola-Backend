const mongoose = require("mongoose");

const FriendRequestModel = new mongoose.Schema(
  {
    from_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FriendRequest", FriendRequestModel);
