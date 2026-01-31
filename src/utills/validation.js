const validator=require("validator")
const validatesignupdata=(req)=>{
  const {firstName,lastName,emailId,password}=req.body;
  if(!firstName || !lastName){
    throw new Error("Name is not valid");
  }
  else if(!validator.isEmail(emailId)){
    throw new Error("emila is not valid");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("please enter strong passwod");
  }
};
const validateEditprofileData=(req)=>{
const allowededitfields=["firstName","lastName","emailId","photourl","gender",
  "age","skills"
];
const iseditallowed=Object.keys(req.body).every(field=>allowededitfields.includes(field));
return iseditallowed;
};
module.exports={validatesignupdata,
  validateEditprofileData,
};