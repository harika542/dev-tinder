const express=require("express");
const app=express();
const connect=require("./config/database");
const User=require("./models/user");
app.use(express.json());
app.post("/signup",async (req,res)=>{
   const dup=req.body;
  const user=new User(dup);
  try{
  await user.save();
res.send("user added sucessfully");}
catch(err){
  console.log("no we got error");
}});
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
