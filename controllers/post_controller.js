const Post=require('../models/post');
const Comment=require('../models/comment');
const moment=require('moment');
exports.createPost=async function(req,res){
    req.body.user=req.user._id;
    let post=await Post.create(req.body);
    let newPost=await post.populate('user');
        if(req.xhr){
            temp={
                date:moment(newPost.createdAt).format('Do MMMM, YYYY'),
                ...newPost._doc
            }
            console.log('temp=',temp);
            return res.status(200).json({
               data:{
                post:temp
               },
               message:'Post created'
           }); 
        }
        console.log('Entry Done:-',temp);
        return res.redirect('/user/home');
};
exports.deletePost=function(req,res){
    Post.findById(req.query.id,function(err,post){
        if(err){
            console.log('error while finding the post to delete it:-',err);
        }
        console.log("**** to be deleted",post);
        if(req.user.id==post.user){
            post.remove();
            Comment.deleteMany({post:req.params.id});
            console.log("Inside post-conroller before if statement");
            if(req.xhr){
                console.log("Inside post-conroller",req.query.id);
                return res.status(200).json({
                    data:{
                        post_id:req.query.id
                    },
                    message:'Post deleted'
                });
            }
        }
    });
};