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
const teacher_service_1 = require("../../../src/models/teacher.service");
describe.only('teacher checkUser Router', () => {
    let tk;
    beforeEach('Add new teacher', () => __awaiter(this, void 0, void 0, function* () {
        yield teacher_service_1.TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234', ['Toiec', 'Tofel'], '123');
        const data = yield teacher_service_1.TeacherService.signInTeacher('tea1', '123');
        tk = data.token;
    }));
    it('KT can signin incase token', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).post('/teacher/checkteacher')
            .set({ token: tk });
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    }));
    it('KT cannot signin incase token invalid', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).post('/teacher/checkteacher')
            .set({ token: 'asdfsfasfdmasfw' });
        assert.equal(res.body.success, false);
        assert.equal(res.status, 404);
    }));
});
