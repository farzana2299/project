const mongoose=require('mongoose')

const userShema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:[3,"Minimum 3 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:String
    },
    linkedIn:{
        type:String
    },
    gitHub:{
        type:String
    },
})
const users=new mongoose.model('users',userShema)

module.exports=users