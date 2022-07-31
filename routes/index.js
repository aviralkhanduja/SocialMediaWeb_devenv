const express=require('express');
const router=express.Router();
const passport=require('passport');
const signuprouter=require('./signup');
const userrouter=require('./user');
const home_controller=require('../controllers/home_controller');

router.get('/',passport.restrictAccess,home_controller.login);
router.use('/signup',passport.restrictAccess,signuprouter);
router.use('/user',passport.checkAuthentication,userrouter);
router.post('/createsession', passport.authenticate(
    'local',
    {failureMessage: true,failureRedirect: '/'},
), home_controller.createSession);
router.get('/signout',home_controller.endSession);
router.get('/users/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/users/auth/google/callback', passport.authenticate('google', {failureRedirect: '/signup'}), home_controller.createSession);
module.exports=router;