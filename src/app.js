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
app.get("/user",async (req,res)=>{
  const userEmail=req.body.emailId;
  try{
    console.log(userEmail);
    const abc=await User.findOne({emailId:userEmail});
    res.send(abc);
  }
  catch(err){
    res.send("it is the error re");
  }
});
app.delete("/user",async (req,res)=>{
  const userId=req.body.userid;
  console.log(userId);
  try{
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  }
  catch(err){
    res.status(404).send("error re");
  }
});
app.patch("/user",async (req,res)=>{
  const userId=req.body.userid;
  const data=req.body;
  try{
    const ALLOWED_UPDATES=["photourl","about","gender","age","skills"];
    const isupdatesallowed=object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k));
    if(!isupdatesallowed){
      throw new Error("updates not allowed");
    }
    await User.findByIdAndUpdate({_id:userId},data,{runValidators:true,});
    res.send("updated Successfully");
  }
  catch(err){
    res.send("error re");
  }
});
app.get("/id",async (req,res)=>{
  const userId=req.body._id;
  try{
    res.send(await User.findById(userId));
  }
  catch(err){
    res.send("error re");
  }
});
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
