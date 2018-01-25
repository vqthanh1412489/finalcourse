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
describe('student/changePassword Router', () => {
    let tk;
    beforeEach('Add new a student', () => __awaiter(this, void 0, void 0, function* () {
        yield student_service_1.StudentService.signUpStudent('student4', '123', 'Student 4', 'std4@gmail.com', '227 LTK', '01698310295', 0, 0);
        const res = yield student_service_1.StudentService.signInStudent('student4', '123');
        tk = res.token;
    }));
    it('KT can change Password student incase right token', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).put(`/student/changePassword`)
            .send({ newPassword: 'Yennhi123' })
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    it('KT cannot change Password student incase wrong token', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).put(`/student/changePassword`)
            .send({ newPassword: 'Yennhi123' })
            .set({ token: 'sfsf..sfljasf' });
        assert.equal(res.status, 404);
    }));
    it('KT cannot change Password student incase right token && empty newPassword', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).put(`/student/changePassword`)
            .send({})
            .set({ token: tk });
        assert.equal(res.status, 404);
    }));
});
