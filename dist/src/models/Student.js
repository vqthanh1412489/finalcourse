"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StudentSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    iamge: { type: String, trim: true },
    score: { type: Number, required: true },
    level: { type: Number, required: true },
    authority: { type: Number, required: true },
    listClass: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Class' }]
});
const StudentMongo = mongoose_1.model('Student', StudentSchema);
class Student extends StudentMongo {
}
exports.Student = Student;
