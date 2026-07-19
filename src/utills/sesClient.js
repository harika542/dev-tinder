const { SESClient }=require("@aws-sdk/client-ses");
const REGION = "ap-south-2";
console.log("ACCESS KEY:", process.env.AWS_ACCESS_KEY);
console.log("SECRET KEY:", process.env.AWS_SES_SECRET);
const sesClient = new SESClient({ region: REGION ,credentials:{
  accessKeyId:process.env.AWS_ACCESS_KEY,
  secretAccessKey:process.env.AWS_SES_SECRET,
},});
module.exports= { sesClient };