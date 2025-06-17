//mvc aproch//
const {default:mongoose} =require('mongoose');
const Student = require('../models/student');
const createError = require('http-errors');


module.exports = {
   addStudent:async (req, res) => {
    try {
        const student = new Student(req.body);
        const result = await student.save();
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
},
getAllStudent:async (req, res, next) => {
    const id = req.params.id;
    try {
        const students = await Student.findByid(id)
        if(!student){
            throw(createError(404,'student does not exist'))
        }
        res.send(students)
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.castError){
            next(createError(400, "invalid student id"));
            return;
        }
        next(error);
    }
},

getstudent:async (req, res, next) => {
    const id = req.params.id;
    try {
        const students = await Student.findByid(id)
        if(!student){
            throw(createError(404,'student does not exist'))
        }
        res.send(students)
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.castError){
            next(createError(400, "invalid student id"));
            return;
        }
        next(error);
    }
},
DeleteStudent:async (req, res) => {
    try {
        const student = await Student.findByIdAndRemove(req.params.id);
        res.send(student); // will return null if not found
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
},
updateStudent:async (req, res, next) => {
    try {
        const result = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.send(result); // will return null if not found
    } catch (error) {
        console.log(error.message);
        
    }
}

}