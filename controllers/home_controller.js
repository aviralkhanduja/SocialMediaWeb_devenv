exports.login=function(req,res){
    return res.render('login');
};
exports.createSession=function(req,res){
    req.flash('success',`Welcome ${req.user.Name}`);
    return res.redirect('/user/home');
};
exports.endSession=function(req,res){
    req.flash('success',`See you soon! ${req.user.Name}`);
    req.logout();
    return res.redirect('/');
};
