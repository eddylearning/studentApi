// const express =require('express');
// const routes = express.Router();
// const

// //get a list of students from the database
// routes.get('/student',(req,res)=>{
//     res.send({type:'Get Request'});
// });
// //add student to db
// routes.post('/student',async(req, res, next)=>{
//     try{
//         const student = new Student(req.body)
//         const result =await student.save();
//     res.send(result);
//     }
// });
    
//   routes.delete('/student',async(req, res, next)=>{
//     try{
//         const student = await Student.findByidAndRemove(id)
//     res.send(student);  
//     }catch(error){
//         console.log(error.message);
        
//     }
// });
// //update students in the db
// routes.put('/student/:id',async(req, res,next)=>{
//     try{
//         const id =req.params.id;
//         const update =req.body;
//         const options={new:true}
//         const result = await Student.FindBYIdAndUpdate(id,update,options)
//     res.send({type:'Update Request'});
//     }catch(error){
//         console.log(error.message);
//         }
// });
// //delete  a student from db
// routes.delete('/student',(req, res)=>{
//     res.send({type:'Delete Request'});
// });
// module.exports = routes;

const express = require('express');
const routes = express.Router();
const Student = require('../models/student'); // Make sure path is correct

// GET all students
routes.get('/student', async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// POST: Add a new student
routes.post('/student', async (req, res) => {
    try {
        const student = new Student(req.body);
        const result = await student.save();
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// DELETE: Delete a student by ID
routes.delete('/student/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndRemove(req.params.id);
        res.send(student); // will return null if not found
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// PUT: Update a student by ID
routes.put('/student/:id', async (req, res) => {
    try {
        const result = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.send(result); // will return null if not found
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = routes;