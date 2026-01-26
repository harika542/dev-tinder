const mongose=require("mongoose");
const connect=async()=>{
  await mongose.connect(
    "mongodb+srv://harikagidituri_db_user:harika542@cluster0.1tptfv7.mongodb.net/devTinder"
  );
};
module.exports=connect;
