const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { url } = require("../urls");

dotenv.config();

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    social: {
      type: Array,
      default: [],
    },
    avatar: {
      type: String,
      default:
        process.env.ENVIRON === "production"
          ? `${url[1]}/images/avatar.png`
          : `${url[0]}/images/avatar.png`,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserModel);
