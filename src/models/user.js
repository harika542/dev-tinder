const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    //index:true,
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
   validate(value){
    if(!validator.isEmail(value)){
      throw new Error("invalid email");
    }
   },
  },
  password:{
    type:"String",
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
      throw new Error("invalid password");
      }
    },
  },
  age:{
    type:Number,
  },
  gender:{
    type:String,
    enum:{
      values:["male","female","other"],
      message:`{VALUE} is not in a valid gender`
    },
  },
  photourl:{
    type:String,
    default:"https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.pinterest.com%2F29bribri29%2Fbasic-pfp%2F&ved=0CBYQjRxqFwoTCPiMvY2hqZIDFQAAAAAdAAAAABAj&opi=89978449",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("invalid url");
      }
    },
  },
  about:{
    type:String,
    default:"this is default about of the user",
  },
  skills:{
    type:[String],
  },
},{timestamps:true,});
UserSchema.index({firstName:1});
UserSchema.methods.getjwt=async function(){
  const user=this;
  const token=await jwt.sign({_id:user._id},"DEV@Tinder$790",{
    expiresIn:"7d"
  });
  return token;
};
UserSchema.methods.validatePassword=async function(passwordInputByUser){
  const user=this;
  const passwordhash=user.password;
  const isPasswordvalid=await bcrypt.compare(passwordInputByUser,passwordhash);
  return isPasswordvalid;
};
module.exports=mongoose.model("User",UserSchema);
