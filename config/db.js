const mongoose = require("mongoose");

//function mongodb database connection

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database host ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB Error is ", error);
  }
};

module.exports = connectdb;
