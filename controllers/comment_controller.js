const Post=require('../models/post');
const Comment=require('../models/comment');
const commentMailer=require('../mailers/commentmailer');
//right state
module.exports.createComment = async function(req, res){
    try{
        let post=await Post.findById(req.body.post);

        if (post){
            let comment=await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment._id);
            post.save();
            let newComment=await comment.populate('user');
            commentMailer.newCommentNotify(newComment);
            res.redirect('/');  
        }
    }
    catch(err){
        console.log('error occured while adding a comment...',err);
        return res.redirect('/');
    }
}
exports.deleteComment= async function(req,res){
    try{
        if(req.query.check1==req.user.id||req.query.check2==req.user.id){
            await Post.findByIdAndUpdate(req.query.post,{$pull:{comments:req.query.comment}});
            await Comment.deleteOne({_id:req.query.comment});
        }
        return res.redirect('/user/home/');
    }catch(err){
        console.log('fault while deleting comment');
        return res.redirect('/user/home/');
    }
};
