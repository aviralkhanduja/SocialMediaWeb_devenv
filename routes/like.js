const express=require('express');
const router=express.Router();
const likeController=require('../controllers/like_controller');
router.get('/create',likeController.toggleLike);
module.exports=router;