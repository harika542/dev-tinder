const mongoose = require("mongoose");

const connect = async () => {
    await mongoose.connect(
      "mongodb+srv://harikagidituri_db_user:Harii542@cluster0.1tptfv7.mongodb.net/?appName=Cluster0"
    )};
module.exports=connect;
//"mongodb+srv://harikagidituri_db_user:harika542@cluster0.1tpfv7.mongodb.net/devTinder"

