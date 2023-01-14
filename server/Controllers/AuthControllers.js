const jwt=require("jsonwebtoken");
const User = require("../Models/UserModel");

const maxAge=3*24*60*60;

const createToken=(id)=>{
    return jwt.sign({id},"portfolio secret key",{
        expiresIn:maxAge,
    });
};

const handleErrors=(err)=>{
    let errors={email: "", password: ""};
    if(err.message==="inncorrect Email"){
        errors.email="That email is not registred"
    }
    if(err.message==="inncorrect password"){
        errors.password="That password is incorrect" 
    }
    if(err.code===11000){
            errors.email="Email Already Exists";
        return errors;
    }
    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}

module.exports.register=async (req,res,next)=>{
    try{
        const{userphoto,fullname,email,job,phone,birthday,adress,password}=req.body;
        const user=await User.create({userphoto,fullname,email,job,phone,birthday,adress,password});
        const token=createToken(user._id);
        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000,
        });
        res.status(201).json({user:user._id,created:true});
    }catch(err){
        console.log(err);
        const errors=handleErrors(err);
        res.json({errors,created:false});
        next()

    }
};
module.exports.login=async (req,res,next)=>{
    try{
        const{email,password}=req.body;
        const user=await User.login(email,password);
        const token=createToken(user._id);
        if(user.role==0){
            res.cookie("jwt",token,{
                withCredentials:true,
                httpOnly:false,
                maxAge:maxAge*1000,
            });
        }else{
            res.cookie("R" , user.role);
        }
        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000,
        });
        res.status(200).json({user:user._id,created:true});
    }catch(err){
        console.log(err);
        const errors=handleErrors(err);
        res.json({errors,created:false});

    }
};