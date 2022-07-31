const express=require('express');
const router=express.Router();
const post_controller=require('../controllers/post_controller');
router.post('/create',post_controller.createPost);
router.get('/delete/',post_controller.deletePost);
module.exports=router;