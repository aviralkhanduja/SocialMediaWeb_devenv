const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const moment=require('moment');
const User = require('../models/user');
console.log('Hello');
passport.use(new LocalStrategy({
    usernameField: 'Email',
    passReqToCallback:true
},
function(req,email, password, done){
    // find a user and establish the identity
    User.findOne({Email: email}, function(err, user)  {
        if (err){
            req.flash('error',err);
            return done(err);
        }

        if (!user || user.password != password){
            req.flash('error','Invalid username/Password');
            return done(null, false);
        }
        else
        return done(null, user);
    });
}


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
User.findById(id, function(err, user){
    if(err){
        console.log('Error in finding user --> Passport');
        return done(err);
    }

    return done(null, user);
});
});
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated())
    return next();
    return res.redirect('/');
}
passport.restrictAccess=function(req,res,next){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/home');
    }
    return next();
}
passport.setAuthenticatedUser=function(req,res,next){
    console.log('middleware setting user up');
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
        res.locals.moment=moment;
    }
    next();
}
module.exports = passport;