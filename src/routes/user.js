const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user")
userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
  try{
    const loggedinuser=req.user;
    const connectionRequest=await ConnectionRequest.find({
      toUserId:loggedinuser._id,
      status:"interested",
    }).populate("fromUserId",["firstName","lastName","about","photourl","age","gender"]);
    console.log(connectionRequest);
    console.log(loggedinuser._id);
    res.json({
      message:"data fetched successfully",
      data:connectionRequest,
    });
  }
  catch(err){
    res.status(404).send("Error: "+err.message);
  }
});
userRouter.get("/user/connections",userAuth,async (req,res)=>{
  try{
    const loggedinuser=req.user;
    const connectionRequest=await ConnectionRequest.find({
      $or:[
        {toUserId:loggedinuser,status:"accepted"},
        {fromUserId:loggedinuser,status:"accepted"}
      ],
    }).populate("fromUserId",["firstName","lastName","photourl","about","age","gender"]).
    populate("toUserId",["firstName","lastName","photourl","about","age","gender"]);
    const data=connectionRequest.map((row)=>{
      if(row.fromUserId._id.toString()===loggedinuser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.send(data);
  }
  catch(err){
    res.status(400).send(err.message);
  }
});
userRouter.get("/feed",userAuth,async (req,res)=>{
  try{
    const loggedinuser=req.user;
    const page=parseInt(req.query.page) || 1;
    let limit=parseInt(req.query.limit) || 10;
    limit=limit>50?50:limit;
    const skip=(page-1)*limit;
    const connectionRequest=await ConnectionRequest.find({
      $or:[{fromUserId:loggedinuser._id,},
           {toUserId:loggedinuser._id,}
      ],
    }).select("fromUserId toUserId");
    const hideUserfromfeed=new Set();
    connectionRequest.forEach((req)=>{
      hideUserfromfeed.add(req.fromUserId.toString());
      hideUserfromfeed.add(req.toUserId.toString());
    });
    console.log(hideUserfromfeed);
    const users=await User.find({
      $and:[
      {_id:{$nin:Array.from(hideUserfromfeed)}},
      {_id:{$ne:loggedinuser._id}},],
    }).select("firstName  lastName photourl age gender about skills ").skip(skip).limit(limit);
    res.send(users);
  }
  catch(err){
    res.status(400).send("Error: "+err.message);
  }
});
module.exports=userRouter;