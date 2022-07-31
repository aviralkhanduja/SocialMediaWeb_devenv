const Post=require('../models/post');
const User=require('../models/user');
const path=require('path');
const fs=require('fs');
exports.displayHomeSpecific=async function(req,res){
    //make posts view at home wall specific to user later
    try{    
        let posts=await Post.find({}).sort('-createdAt').populate('user',"-password"). populate({path: 'comments', populate: {path: 'user'}});
        console.log(posts);
        return res.render('home',{
            posts:posts
        });
    }catch(err){
        return console.log('error while loading home:',err);
    }
};
exports.displayProfileSpecific=function(req,res){
    return res.render('profile');
};
exports.updateForm=function(req,res){
    return res.render('update_form');
};
exports.updateUser=function(req,res){
    try{
        User.uploadedAvatar(req,res,async function(err){
            console.log('IN HERE USER CONTROLLER');
            let user=await User.findByIdAndUpdate(req.user._id,req.body);
            console.log('IN HERE USER CONTROLLER 2',req.body);
            //console.log('fine');
            if(req.file){
                //console.log('fine 2');
                if(user.avatar&&fs.existsSync(path.join(__dirname,'..',user.avatar))){
                    //unlinks the database and corresponsingly deletes file from the path.
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                user.avatar=User.avatarPath+'/'+req.file.filename;
                user.save();
            }
            console.log('IN HERE USER CONTROLLER 3');
            return res.redirect('/user/home');
        });
    }
    catch{
        req.flash('error',err);
        return res.redirect('/user/home/updateform');
    }
};