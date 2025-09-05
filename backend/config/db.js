const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || {});
    console.log("mongodb connected");
  } catch (e) {
    console.error("Error connecting to Mongodb", e);
    process.exit(1);
  }
};
module.exports = connectDB;
