const User=require('../models/user');
const Post=require('../models/post');
exports.signup=function(req,res){
    return res.render('signup');
};
exports.createUser=async function(req,res){
    try{
        User.uploadedAvatar(req,res,function(err){
            if(req.body.Confirm_Password===req.body.password){
                User.create(req.body,function(err,newentry){
                    if(req.file){
                        newentry.avatar=User.avatarPath+'/'+req.file.filename;
                        newentry.save();
                    }
                    console.log('new user added:',newentry);
                });
                return res.redirect('/');
            }
            return res.redirect('/signup');
        });
    }catch(err){
        console.log('err while signing up:',err);
        return res.redirect('/signup');
    }   
};
