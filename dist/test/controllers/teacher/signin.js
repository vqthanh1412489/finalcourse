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
const Teacher_1 = require("../../../src/models/Teacher");
const teacher_service_1 = require("../../../src/models/teacher.service");
describe('Teacher signin Router', () => {
    beforeEach('Add new teacher', () => __awaiter(this, void 0, void 0, function* () {
        yield teacher_service_1.TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234', ['Toiec', 'Tofel'], '123');
    }));
    it('KT can signin incase with username && password', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            username: 'tea1',
            password: '123',
        };
        const res = yield request(app_1.app).post('/teacher/signin')
            .send(body);
        const teacher = yield Teacher_1.Teacher.findOne({ username: 'tea1' });
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    }));
});
