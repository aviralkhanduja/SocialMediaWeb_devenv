const nodeMailer=require('../config/nodemailer');
exports.newCommentNotify=(comment)=>{
    console.log('Comment in mailer=',comment);
    //one can use render function in nodeMailer with custom data and template to send notification and this mechanism will enjoy good modularity.
    const htmlString=nodeMailer.renderTemplate({comment:comment},'/comment_published.ejs');
    console.log("Inside comment-mailer service",htmlString);
    nodeMailer.transporter.sendMail({
        from:'codeconnect01@gmail.com',
        to:comment.user.Email,
        subject:'New comment added',
        html:htmlString
        //html:'<h3>Hey! your comment got published.</h3>'(used for hardcoding the message)
    },(err,info)=>{
        if(err){console.log('error occured while sending mail.',err);return;}
        return console.log('Email sent',info);
    });
};