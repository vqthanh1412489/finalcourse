"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("../../libs/jwt");
const Student_1 = require("../Student");
class StudentService {
    // Quyen Ad
    static signUpStudent(username, password, name, email, address, phone, score, level) {
        return __awaiter(this, void 0, void 0, function* () {
            const encrypted = yield bcrypt_1.hash(password, 8);
            const student = new Student_1.Student({
                username, password: encrypted,
                name,
                email, address, phone,
                image: '',
                score: 0, level: 0,
                authority: 2
            });
            yield student.save();
            return student;
        });
    }
    // Quyen Student
    static signInStudent(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield Student_1.Student.findOne({ username });
            if (!student)
                throw new Error('User not exists');
            if (student.authority !== 2)
                throw new Error('You are not a student');
            const same = yield bcrypt_1.compare(password, student.password);
            if (!same)
                throw new Error('Password invalid');
            const studentInfor = student.toObject();
            delete studentInfor.password;
            const token = yield jwt_1.createToken({ _id: student._id, authority: student.authority });
            return { student: studentInfor, token };
        });
    }
    static checkStudent(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, authority } = yield jwt_1.verifyToken(token);
            const student = yield Student_1.Student.findById(_id);
            if (!student)
                throw new Error('User not exists');
            if (student.authority !== 2)
                throw new Error('You are not student');
            const studentInfor = student.toObject();
            delete studentInfor.password;
            const newToken = yield jwt_1.createToken({ _id: student._id, authority: student.authority });
            return { student: studentInfor, token: newToken };
        });
    }
    // Can quyen Admin
    static deteleStudent(idStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentRemoved = yield Student_1.Student.findByIdAndRemove(idStudent);
            if (!studentRemoved)
                throw new Error('idStudent not found');
            const studentInfor = studentRemoved.toObject();
            delete studentInfor.password;
            return studentInfor;
        });
    }
    // Student
    static updatePasswordStudent(idStudent, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const encrypted = yield bcrypt_1.hash(newPassword, 8);
            const newStudent = yield Student_1.Student.findByIdAndUpdate(idStudent, { password: encrypted }, { new: true });
            if (!newStudent)
                throw new Error('idStudent not found');
            const studentInfor = newStudent.toObject();
            delete studentInfor.password;
            return studentInfor;
        });
    }
    static addClassToStudent(idStudent, idClass) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStudent = yield Student_1.Student.findByIdAndUpdate(idStudent, {
                $addToSet: {
                    listClass: idClass
                }
            }, { new: true });
            if (!newStudent)
                throw new Error('idStudent not found');
            return newStudent;
        });
    }
    static removeClassToStudent(idStudent, idClass) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStudent = yield Student_1.Student.findByIdAndUpdate(idStudent, {
                $pull: {
                    listClass: idClass
                }
            }, { new: true });
            if (!newStudent)
                throw new Error('idStudent not found');
            return newStudent;
        });
    }
}
exports.StudentService = StudentService;
