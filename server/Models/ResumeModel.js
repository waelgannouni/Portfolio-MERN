const mongoose=require('mongoose')

const Resume=new mongoose.Schema({
    
    user:{
        type:String,
    },
    education:[{
        university:{ type:String},
        from:{ type:String},
        until:{ type:String},
        description:{ type:String},
    }
    ],
    experience:[{
        company:{ type:String},
        from:{ type:String},
        until:{ type:String},
        description:{ type:String},
    }
    ],
    skills:[{
        skill:{ type:String},
        percent:{ type:Number},
    }
    ],
    created_At : { type: Date, required: true, default: Date.now }

})


module.exports=mongoose.model("Resume",Resume)