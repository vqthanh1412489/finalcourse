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
describe('admin/changePassword Router', () => {
    let tk;
    beforeEach('Add new a Admin', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    }));
    it('KT can change Password Admin incase right token', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).put(`/admin/changePassword`)
            .send({ newPassword: 'Yennhi123' })
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    it('KT cannot change Password Admin incase wrong token', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).put(`/admin/changePassword`)
            .send({ newPassword: 'Yennhi123' })
            .set({ token: 'asdfsafaskhayasf.afskfaf' });
        assert.equal(res.status, 404);
    }));
});
