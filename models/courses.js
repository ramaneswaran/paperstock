const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseCode : {
        type: String,
        required: true,
    },
    courseName : {
        type: String,
        required: true,
    }
    courseLinks : {
        type: [String],
    }
});

module.exports = mongoose.model('course', courseSchema);