// mvc approach //
const { default: mongoose } = require('mongoose');
const Student = require('../models/student');
const createError = require('http-errors');

module.exports = {
  
//   addStudent:async (req, res) => {
//     try {
//         const student = new Student(req.body);
//         const result = await student.save();
//         res.send(result);
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
//     //shows on the terminal if data is being sent by postman when posting
//     console.log('Received data:', req.body);

  // ✅ Add a student to the database
  addStudent: async (req, res) => {
    try {
      // shows on the terminal if data is being sent by postman when posting
      console.log('Received data:', req.body);

      const student = new Student(req.body);
      const result = await student.save();

      // ✅ Send HTTP 201 Created on success
      res.status(201).send(result);
    } catch (error) {
      console.error("Error adding student:", error.message);
      res.status(400).send({ error: error.message });
    }
  },

  // ✅ Get a list of students from the database
  getAllStudent: async (req, res, next) => {
    try {
      const students = await Student.find(); // No ID needed here
      res.send(students);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  // ✅ Get a single student by ID from the database
  getStudent: async (req, res, next) => {
    const id = req.params.id;
    try {
      const student = await Student.findById(id);
      if (!student) {
        throw createError(404, 'student does not exist');
      }
      res.send(student);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "invalid student id"));
        return;
      }
      next(error);
    }
  },

  // ✅ Delete a student from the database
  DeleteStudent: async (req, res, next) => {
    const id = req.params.id;
    try {
      const student = await Student.findByIdAndRemove(id);
      if (!student) {
        throw createError(404, "student does not exist");
      }
      res.send(student); // will return null if not found
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "invalid student id"));
      }
      next(error);
    }
  },

  // ✅ Update a student in the database
  UpdateStudent: async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const options = { new: true };

      const result = await Student.findByIdAndUpdate(id, update, options);
      if (!result) {
        throw createError(404, "student does not exist");
      }
      res.send(result); // will return null if not found
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "invalid student id"));
      }
      next(error);
    }
  }
};
