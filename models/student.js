const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const studentSchema = new Schema({
    Firstname:{
        type:String,
        required:[true,'Firstname is required']
    },
    Lastname:{
        type:String,
        required:[true,'Lastname is required']
    },
    Gender:{
        type:String,
    }
});

const Student = mongoose.model('Student', studentSchema);
// create a model that is going to represent our collection in the db
module.exports = Student;
//here we are exporting this file so that we can use it in other files
