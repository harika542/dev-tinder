const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:50,
  },
  lastName:{
    type:String,
  },
  emailId:{
    type:String,
    lowercase:true,
    required:true,
    unique:true,
   trim:true,
  },
  password:{
    type:"String",
    required:true,
  },
  age:{
    type:Number,
  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("gender data not valid");
      }
    },
  },
  photourl:{
    type:String,
    default:"https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.pinterest.com%2F29bribri29%2Fbasic-pfp%2F&ved=0CBYQjRxqFwoTCPiMvY2hqZIDFQAAAAAdAAAAABAj&opi=89978449",
  },
  about:{
    type:String,
    default:"this is default about of the user",
  },
  skills:{
    type:[String],
  },
},{timestamps:true,});
module.exports=mongoose.model("User",UserSchema);
