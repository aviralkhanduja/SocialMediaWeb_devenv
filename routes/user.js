const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/user_controller');
const postrouter=require('./post');
const commentrouter=require('./comment');
const likerouter=require('./like');
router.get('/home',user_controller.displayHomeSpecific);
router.get('/home/updateform',user_controller.updateForm);
router.post('/home/updateuser',user_controller.updateUser);
router.use('/home/comment',commentrouter);
router.use('/home/post',postrouter);
router.use('/home/like',likerouter);
router.get('/profile',user_controller.displayProfileSpecific);

module.exports=router;