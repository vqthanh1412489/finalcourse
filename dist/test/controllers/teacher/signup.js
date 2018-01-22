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
describe('Teacher signup Router', () => {
    it('KT can signup new Teacher incase full infor', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            username: 'tea2',
            password: '123',
            name: 'teacher2',
            email: 'tea2@gmai.com',
            phone: '1456789',
            nationality: 'Koreal',
            address: 'Seoul',
            bank: 'ACB',
            bankAccountNumber: '1234567894222',
            skill: ['Toiec', 'Ielts'],
            note: 'I refused to love her'
        };
        const res = yield request(app_1.app).post('/teacher/signup')
            .send(body);
        const teacher = yield Teacher_1.Teacher.findOne({ username: 'tea2' });
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    }));
});
