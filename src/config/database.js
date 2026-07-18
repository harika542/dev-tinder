const mongoose = require("mongoose");

//"mongodb+srv://harikagidituri_db_user:harika542@cluster0.1tpfv7.mongodb.net/devTinde
const connect = async () => {
  try {
    await mongoose.connect(
  "mongodb+srv://harikagidituri_db_user:Harika542123@cluster0.1tptfv7.mongodb.net/devTinder?appName=Cluster0"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DATABASE ERROR:");
    console.log(err);
    throw err;
  }
};

module.exports = connect;
