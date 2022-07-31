const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');
let transporter=nodemailer.createTransport({
    service:'gmail',
    //for gmail mailing server to define strategy we use this domain as developer
    host:'smtp.gmail.com',
    port:587,//TLS
    secure:false,//2 factor
    auth: {
        user: 'codeconnect01@gmail.com',
        pass: 'llgsahkyvyhaqxss'
    }
});
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    console.log('inside-nodemailer,path=',path.join(__dirname, '../views/mailers', relativePath));

    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(err, template){
            if (err){console.log('error in rendering template',err); return}
            mailHTML = template;
        }
    )
    return mailHTML;
};
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}