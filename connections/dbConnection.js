const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const connectDB = async () => {
  try {
    mongoose.connect(
      process.env.ENIRON === "production"
        ? process.env.MONGODB_REMOTE
        : process.env.MONGODB_LOCAL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () =>
        console.log(
          `Connected to ${
            process.env.ENIRON === "production"
              ? "Production DB"
              : "Development DB"
          }`
        )
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectDB,
};
