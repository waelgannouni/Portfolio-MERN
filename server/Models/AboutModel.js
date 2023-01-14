const mongoose=require('mongoose')

const About=new mongoose.Schema({
    
    description:{
        type: String,
    },
    user:{
        type:String,
    },
    hobies:[{
        icon:{ type:String},
        title:{ type:String},
        desc:{ type:String},
    }
    ],
    created_At : { type: Date, required: true, default: Date.now }

})


module.exports=mongoose.model("About",About)