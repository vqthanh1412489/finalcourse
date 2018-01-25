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
const assert = require("assert");
const request = require("supertest");
const app_1 = require("../../../src/app");
const admin_service_1 = require("../../../src/models/admin.service");
const student_service_1 = require("../../../src/models/service/student.service");
const Student_1 = require("../../../src/models/Student");
describe('Student delete Router', () => {
    let tk;
    let idStudent;
    beforeEach('Add a new Admin - Student', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
        yield student_service_1.StudentService.signUpStudent('student3', '123', 'Student 3', 'std2@gmail.com', '227 NHCanh', '01698310295', 0, 0);
        const student = yield Student_1.Student.findOne({ username: 'student3' });
        idStudent = student._id;
    }));
    xit('KT can delete the Student incase idStudent && is Admin', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/student/${idStudent}`)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    it('KT cannot delete the Student incase idStudent && is not Admin', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/student/${idStudent}`)
            .set({ token: 'sfsaf.lajfsf.asfwT%lajf' });
        assert.equal(res.status, 404);
    }));
    it('KT cannot delete the Student incase idStudent && is not Admin', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/student/${idStudent}`)
            .set({ token: 'sfsaf.lajfsf.asfwT%lajf' });
        assert.equal(res.status, 404);
    }));
});
