"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TeacherSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    bank: { type: String, required: true, trim: true },
    bankAccountNumber: { type: String, required: true, trim: true },
    skill: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    dateSignUp: { type: Date, required: true, trim: true },
    note: { type: String, trim: true },
    authority: { type: Number, required: true } // 0: Admin - 1: Teacher - 2: Student
});
const TeacherMongo = mongoose_1.model('Teacher', TeacherSchema);
class Teacher extends TeacherMongo {
}
exports.Teacher = Teacher;
