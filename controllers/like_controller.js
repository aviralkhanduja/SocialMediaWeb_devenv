const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.toggleLike=async(req,res)=>{
    console.log('req.query=',req.query);
    try{
        let liked;
        let deleted=false;
        if(req.query.type==='Post'){
            liked=await Post.findById(req.query.id).populate('likes');
        }
        else if(req.query.type==='Comment') {
            liked=await Comment.findById(req.query.id).populate('likes');
        }
        //console.log('posttemp likes=',posttemp.likes);
        let like=await Like.findOne({user:req.user._id,liked:req.query.id,onModel:req.query.type});
        //console.log('Like_exists=',Like_exists);
        console.log('Like=',like); 
        if(like){
            console.log('in here...Hello');
            liked.likes.pull(like._id);
            like.remove();
            deleted=true;
        }
        else{
            const newlike=await Like.create({
                user:req.user._id,
                liked:req.query.id,
                onModel:req.query.type
            });
            await liked.likes.push(newlike._id);
        }
        liked.save();
        return res.status(200).json({
            message: "Like Toggled!",
            data: {
                deleted,
                count:liked.likes.length
            }
        }); 
    }
    catch(err){
        console.log('error while liking',err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}