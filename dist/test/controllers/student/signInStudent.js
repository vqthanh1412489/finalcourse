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
const student_service_1 = require("../../../src/models/service/student.service");
describe('Student signin Router', () => {
    beforeEach('Add a new Student', () => __awaiter(this, void 0, void 0, function* () {
        yield student_service_1.StudentService.signUpStudent('student2', '123', 'Student 2', 'std2@gmail.com', '227 LVC', '01698310295', 0, 0);
    }));
    it('KT can signin incase have username && password', () => __awaiter(this, void 0, void 0, function* () {
        const body = { username: 'student2', password: '123' };
        const res = yield request(app_1.app).post('/student/signin')
            .send(body);
        assert.equal(res.status, 200);
    }));
    it('KT cannot signin incase wrong username', () => __awaiter(this, void 0, void 0, function* () {
        const body = { username: 'student2ST', password: '123' };
        const res = yield request(app_1.app).post('/student/signin')
            .send(body);
        assert.equal(res.status, 404);
    }));
    it('KT cannot signin incase wrong password', () => __awaiter(this, void 0, void 0, function* () {
        const body = { username: 'student2', password: '123456' };
        const res = yield request(app_1.app).post('/student/signin')
            .send(body);
        assert.equal(res.status, 404);
    }));
});
