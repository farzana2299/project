const mongoose=require('mongoose')

const projectShema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
     
    },
    overView:{
        type:String,
        required:true,
        
    },
    languages:{
        type:String,
        required:true,
    },
    gitHub:{
        type:String,
        required:true,
    },
   website:{
        type:String,
        required:true,
    },
    proImg:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    }
})
const projects= mongoose.model('projects',projectShema)

module.exports=projects