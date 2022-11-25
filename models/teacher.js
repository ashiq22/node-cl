const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema=new Schema({
    sid: { type: Number, unique: true },
    firstname: { type: String },
    lastname: { type: String},
    year: { type: Number },
    major: { type: String },
    level: {type: String},
    options: {type: String},
    rating : { type: Number},
    gpa : {type: Number },
	visibility: {type: String, default:'T'}
}); 

module.exports = Teacher = mongoose.model('teacher', TeacherSchema);
