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
describe('Student signup Router', () => {
    let tk;
    beforeEach('Add a new Admin', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    }));
    xit('KT can signup new Student incase full infor && is Admin', () => __awaiter(this, void 0, void 0, function* () {
        const body = { username: 'student1', password: '123',
            name: 'Student 1',
            email: 'student1@gmail.com', address: '227 NVC', phone: '01699716055',
            score: 0, level: 0 };
        const res = yield request(app_1.app).post('/student/signup')
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    xit('KT cannot signup new Student incase full infor && is not Admin', () => __awaiter(this, void 0, void 0, function* () {
        const body = { username: 'student1', password: '123',
            name: 'Student 1',
            email: 'student1@gmail.com', address: '227 NVC', phone: '01699716055',
            score: 0, level: 0 };
        const res = yield request(app_1.app).post('/student/signup')
            .send(body)
            .set({ token: 'tk.khasdf.jusfla' });
        assert.equal(res.status, 404);
    }));
    it('KT cannot signup new Student incase empty username && is Admin', () => __awaiter(this, void 0, void 0, function* () {
        const body = { password: '123',
            name: 'Student 1',
            email: 'student1@gmail.com', address: '227 NVC', phone: '01699716055',
            score: 0, level: 0 };
        const res = yield request(app_1.app).post('/student/signup')
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 404);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Signup Fail');
    }));
});
