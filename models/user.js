const mongoose = require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('uploads/users/avatars');
const userSchema = new mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    Email: {
        type: String,
        required: true,
        unique:true
    },
    Phone:{
        type: String,
        max:10,
        min:10
    },
    Address:{
        type: String,   
    },
    Zip_Code: {
        type: String,
    },
    password:{
        type: String,
        required:true
    },
    avatar:{
        type:String,
    }
});
let storage=multer.diskStorage({
    //destination where the file needs to be stored
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    //to store we need the fle name to be unique
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});
userSchema.statics.uploadedAvatar=multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;
const Users = mongoose.model('User', userSchema);
module.exports = Users;