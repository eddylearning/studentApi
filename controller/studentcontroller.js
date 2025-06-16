//mvc aproch//
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
getAllStudent:async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (error) {
        res.status(500).send({ error: error.message });
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
        res.status(500).send({ error: error.message });
    }
}

}