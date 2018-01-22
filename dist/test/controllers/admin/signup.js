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
const Admin_1 = require("../../../src/models/Admin");
describe('Admin signup Router', () => {
    it('KT can signup new Admin incase full infor', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            username: 'vqthanh1',
            password: '123',
            name: 'Thanh123',
            email: 'vqthanh1@gmail.com',
            phone: '01698312555',
            address: '5/22 le van chi',
            birthDay: '1995-09-30'
        };
        const res = yield request(app_1.app).post('/admin/signup')
            .send(body);
        const admin = yield Admin_1.Admin.findOne({ username: 'vqthanh1' });
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    }));
});
