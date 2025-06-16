const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstname:{
        type:String,
        required:[true,'Firstname is required']
    },
    Lastname:{
        type:String,
        required:[true,'Lastname is required']
    },
    gender:{
        type:String,
    }
});

const student =mongoose.model('student', studentSchema);
// create a model that is going to represent our collection in the db
module.export =student;
//here we are exporting this file so that we can use it in other files
