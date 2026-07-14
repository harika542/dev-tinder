const express=require("express");
const app=express();
const connect=require("./config/database");
const cookieparser=require("cookie-parser");
const cors=require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieparser());
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/requests");
const userRouter=require("./routes/user")
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
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
  console.log(err);
})
