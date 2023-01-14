const mongoose=require('mongoose')
const bcrypt=require("bcrypt")

const User=new mongoose.Schema({
    
    userphoto:{
        type: String,
        
    },
    fullname:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    job:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
    },
    birthday:{
        type: String,
    },
    adress:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    linkdin:{
        type: String,
    },
    instagram:{
        type: String,
    },
    facebook:{
        type: String,
    },
    github:{
        type: String,
    },

    created_At : { type: Date, required: true, default: Date.now }

})

User.pre("save",async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

User.statics.login=async function(email,password){
    const user =await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error("inncorrect password");
    }
    throw Error("inncorrect Email");
};

module.exports=mongoose.model("Users",User)