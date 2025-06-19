
const express = require("express");
const routes = express.Router();

const studentcontroller = require ("../controller/studentcontroller");

// Get a list of students from the database
routes.get('/getAllStudent',studentcontroller.getAllStudent );
routes.get('/getStudent',studentcontroller.getStudent);

// Add a student to the database
routes.post('/addStudent',studentcontroller.addStudent);

// Update a student in the database
// routes.put('/students/:id', (req, res) => {
//     res.send({ type: 'Update Request' });
// });


routes.patch('/UpdateStudent/:id',studentcontroller.UpdateStudent );

// Delete a student from the database
routes.delete('/DeleteStudent/:id',studentcontroller.DeleteStudent);
module.exports = routes;