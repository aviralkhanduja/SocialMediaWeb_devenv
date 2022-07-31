const express=require('express');
const router=express.Router();
const comment_controller=require('../controllers/comment_controller');
router.post('/create',comment_controller.createComment);
router.get('/delete',comment_controller.deleteComment);
module.exports=router;