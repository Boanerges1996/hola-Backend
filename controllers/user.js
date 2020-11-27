const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const rootDir = require("../util/index");
const UserModel = require("../model/user");

dotenv.config();

createUser = async (req, res) => {
  if (
    Object.entries(req.body).length === 0 &&
    req.body.constructor === Object
  ) {
    res.send({ message: "Please provide a body" });
  } else {
    try {
      let email = req.body.email;
      let verifyEmail = await UserModel.findOne({ email: email });
      if (verifyEmail) {
        res.send({
          message: "Account with this email already exists",
          exist: true,
        });
      } else {
        let salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(req.body.password, salt);

        // Save password after hashing
        let newRest = new UserModel({
          ...req.body,
          password: hashedPassword,
        });

        await newRest.save();

        res.status(201).send({
          message: "Registered successfully",
          registered: true,
          exist: false,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
};

loginUser = async (req, res) => {
  if (
    Object.entries(req.body).length === 0 &&
    req.body.constructor === Object
  ) {
    res.send({ message: "Please provide a body" });
  } else {
    const email = req.body.email;
    // console.log(email);
    try {
      const verifyUser = await UserModel.findOne({ email: email });
      if (verifyUser) {
        const verifyPassword = await bcryptjs.compare(
          req.body.password,
          verifyUser.password
        );
        if (verifyPassword) {
          const getUser = await UserModel.findOne({ email: email });
          let auth_token = await jwt.sign(
            { email: email },
            process.env.SECRET_KEY,
            { algorithm: "HS256" }
          );
          res
            .status(200)
            .set({ auth_token })
            .send({
              ...getUser._doc,
              logged: true,
              exist: true,
              invalid: false,
              auth_token,
            });
        } else {
          res.status(200).send({
            logged: false,
            message: "Invalid email or password",
            invalid: true,
            exist: true,
          });
        }
      } else {
        res.status(200).send({
          exist: false,
          message: "Please You dont have an account",
          logged: false,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
};

module.exports = {
  createUser,
  loginUser,
};
