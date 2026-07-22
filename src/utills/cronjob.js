const cron= require("node-cron");
const {subDays, startOfDay, endOfDay}=require("date-fns");
const sendEmail=require("./sendEmail");
const ConnectionRequest=require("../models/connectionRequest");
cron.schedule("0 8 * * *",async ()=>{
 // sending to perople who got request
 try{
  const yesterday=subDays(new Date(),1);
  const yesterdayStart=startOfDay(yesterday);
  const  yesterdayEnd=endOfDay(yesterday);
    const pendingRequests=await ConnectionRequest.find({
       status:"interested",
       createdAt:{
            $gte:yesterdayStart,
            $lt:yesterdayEnd,
       },
    }).populate("fromUserId toUserId");
    const listOfEmails=[...new Set(pendingRequests.map(req=>req.toUserId.emailId))];
    console.log(listOfEmails);
    for(const email of listOfEmails){
         try{
          const res=await sendEmail.run("new friedn requests pending for "+email,
            "there are so many peding requests please login to thre portal"
            );
            console.log(res);
         }
         catch(err){}
    }
 }
 catch(err){
  console.error(err);
 }
});