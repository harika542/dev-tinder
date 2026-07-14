const express=require("express");
const authRouter=express.Router();
const bcrypt=require("bcrypt");
const User=require("../models/user");
const {validatesignupdata}=require("../utills/validation");
authRouter.post("/signup",async (req,res)=>{
  try{
    // vlaidation of sign up data
    validatesignupdata(req);
    //encrypt the data
    const {firstName,lastName,emailId,password}=req.body;
    const passwordhash=await bcrypt.hash(password,10);
    console.log(passwordhash);
   const user=new User({
    firstName,
    lastName,
    emailId,
    password:passwordhash,
   });
  const saveduser=await user.save();
  const token=await saveduser.getjwt();
  res.cookie("token",token,{httpOnly: true,
  secure: false,   // localhost
  sameSite: "lax",
  expires: new Date(Date.now() + 8 * 3600000),});
  
res.json({message:"user added sucessfully",data:saveduser});}
catch(err){
  res.send("no we got error"+err);
}});
authRouter.post("/login",async (req,res)=>{
  try{
    const{emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("email id is not valid");
    }
 const ispasswordvalid=await user.validatePassword(password);
 if(ispasswordvalid){
  const token=await user.getjwt();
  res.cookie("token",token,{httpOnly: true,
  secure: false,   // localhost
  sameSite: "lax",
  expires: new Date(Date.now() + 8 * 3600000),});
  res.send(user);
 }
 else{
  throw new Error("invalid credentials");
 }
  }catch(err){
    res.status(400).send("error"+err.message);
  }
});
authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{expires:
    new Date(Date.now())
  });
  res.send("Logout suceessfull!!");
})
module.exports=authRouter;