const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const {validateEditprofileData}=require("../utills/validation");
const bcrypt=require("bcrypt");
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
  try{
  const user=req.user;
  console.log("ok ra");
  res.send(user);
}
  catch(err){
    res.status(404).send("ERROR :"+err.message);
  }
});
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
  try{
    if(!validateEditprofileData(req)){
      throw new Error("Invalid Edit Request");
    }
    const loggedInuser=req.user;
    Object.keys(req.body).forEach((key)=>(
      loggedInuser[key]=req.body[key]));
      await loggedInuser.save();
      res.json({
        message:`${loggedInuser.firstName},is successfully updated`,
        data:loggedInuser,
      });}
  catch(err){
    res.status(400).send("Error: "+err.message);
  }
});
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new Error("Old and new password required");
    }

    const user = req.user;

    // old password correct aa check
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is wrong");
    }

    // new password hash
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
module.exports=profileRouter;