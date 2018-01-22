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
const jwt_1 = require("../libs/jwt");
const Teacher_1 = require("./Teacher");
class TeacherService {
    static signUpTeacher(username, password, name, email, phone, nationality, address, bank, bankAccountNumber, skill, note) {
        return __awaiter(this, void 0, void 0, function* () {
            const encrypted = yield bcrypt_1.hash(password, 8);
            const dateSignUp = new Date(Date.now());
            const teacher = new Teacher_1.Teacher({
                username,
                password: encrypted,
                name, email, phone, nationality, address,
                bank, bankAccountNumber,
                image: '',
                dateSignUp,
                note,
                skill,
                authority: 1
            });
            yield teacher.save();
            const teacherInfor = teacher.toObject();
            delete teacherInfor.password;
            return teacherInfor;
        });
    }
    static signInTeacher(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield Teacher_1.Teacher.findOne({ username });
            if (!teacher)
                throw new Error('User not exists');
            const same = yield bcrypt_1.compare(password, teacher.password);
            if (!same)
                throw new Error('Password invalid');
            const teacherInfor = teacher.toObject();
            delete teacherInfor.password;
            const token = yield jwt_1.createToken({ _id: teacher._id, authority: teacher.authority });
            return { teacher: teacherInfor, token };
        });
    }
    static checkTeacher(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, authority } = yield jwt_1.verifyToken(token);
            const teacher = yield Teacher_1.Teacher.findById(_id);
            if (!teacher)
                throw new Error('User not exists');
            if (teacher.authority !== 1)
                throw new Error('You are not Teacher');
            const teacherInfor = teacher.toObject();
            delete teacherInfor.password;
            const newToken = yield jwt_1.createToken({ _id: teacher._id, authority: teacher.authority });
            return { teacher: teacherInfor, token: newToken };
        });
    }
}
exports.TeacherService = TeacherService;
