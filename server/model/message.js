var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoDb',{useNewUrlParser:true});
var mongoSchema=mongoose.Schema;
var messageSchema=new mongoSchema({
    'message' :{
        type:String,
        required:true
    },
    'username' :{
        type:String,
        required:true
    },
    'date' :{
        type:Date,
        required:true
    }
    
});
module.exports=mongoose.model('messages',messageSchema);