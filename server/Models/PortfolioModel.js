const mongoose=require('mongoose')

const Portfolio=new mongoose.Schema({
    
    user:{
        type:String,
    },
    images:{ 
        type: [String],
    },
    title:{ 
        type: String,
    },
    categorie:{ 
        type: String,
    },
    description:{ 
        type: String,
    },

    created_At : { type: Date, required: true, default: Date.now }

})


module.exports=mongoose.model("Portfolio",Portfolio)