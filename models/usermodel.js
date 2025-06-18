const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    
});

const User = mongoose.model('User', userSchema);
// create a model that is going to represent our collection in the db
module.exports = User;
//here we are exporting this file so that we can use it in other files
