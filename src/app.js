const express=require("express");
const app=express();
const connect=require("./config/database");
const cookieparser=require("cookie-parser");
app.use(express.json());
app.use(cookieparser());
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/requests");
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
connect().then(
  ()=>{
    console.log("database connection extablished");
    app.listen(7777,
  ()=>{
    console.log("succesfully listening re");
  }
);
  }
)
.catch((err)=>{
  console.log("datbase cannot be conneccted");
})
