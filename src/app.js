const express=require("express");
const app=express();
app.get("usere/" ,(req,res)=>{
  res.send("hi re");
});
app.use((req,res)=>{
  res.send("hello from  the server");
});
app.listen(3000,
  ()=>{
    console.log("succesfully listening re");
  }
);
