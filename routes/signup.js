const express=require('express');
const router=express.Router();
const signup_controller=require('../controllers/signup_controller');
router.get('/',signup_controller.signup);
router.post('/adduser',signup_controller.createUser);
module.exports=router;