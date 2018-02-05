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
const admin_service_1 = require("../../../src/models/admin.service");
describe('Admin signin Router', () => {
    beforeEach('Add new Admin', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
    }));
    it('KT can signin incase with username && password', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            username: 'vqt1',
            password: '123',
        };
        const res = yield request(app_1.app).post('/admin/signin')
            .send(body);
        const admin = yield Admin_1.Admin.findOne({ username: 'vqt1' });
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    }));
});
