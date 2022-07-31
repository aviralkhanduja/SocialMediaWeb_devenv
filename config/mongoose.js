const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/CodeConnectDev');
const db=mongoose.connection;
db.on('error', function(err) { console.log(err.message); });
db.once('open',function(){
    console.log('Odm connected to DB and we are ready to handle http requests');
});