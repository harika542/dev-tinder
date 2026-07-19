const mongoose = require("mongoose");

//"mongodb+srv://harikagidituri_db_user:harika542@cluster0.1tpfv7.mongodb.net/devTinde
//"mongodb+srv://harikagidituri_db_user:Harika542123@cluster0.1tptfv7.mongodb.net/devTinder?appName=Cluster0"
const connect = async () => {
  try {
    console.log(process.env.DB_CONNECTION_SECRET)
    await mongoose.connect(
     process.env.DB_CONNECTION_SECRET)
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DATABASE ERROR:");
    console.log(err);
    throw err;
  }
};

module.exports = connect;
