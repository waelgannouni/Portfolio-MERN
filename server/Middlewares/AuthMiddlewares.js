const User = require("../Models/UserModel");
const jwt=require('jsonwebtoken');


module.exports.checkUser=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"portfolio secret key",async(err,decodedToken)=>{
            if(err){
                 res.json({status:false});
                 next()
            }else{
                const user=await User.findById(decodedToken.id);
                if(user){
                    res.json(user);
                }else res.json({status:false});
                next()
            }
        })
    }else{
        res.json({status:false});
        next();
    }
}