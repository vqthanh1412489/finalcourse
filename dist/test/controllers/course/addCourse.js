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
describe('add COurse Router', () => {
    let tk;
    beforeEach('Add new a Admin', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    }));
    xit('KT can add new a Course incase full infor && you are Admin', () => __awaiter(this, void 0, void 0, function* () {
        let startDate;
        startDate = new Date('2018-01-25');
        let endDate;
        endDate = new Date('2018-05-14');
        const body = {
            name: 'FEC357',
            numberSession: 12,
            startDate,
            endDate,
            tuition: 5000000,
            detailInfor: 'Basic Englist'
        };
        const response = yield request(app_1.app).post('/course/')
            .send(body)
            .set({ token: tk });
        assert.equal(response.status, 200);
    }));
    it('KT cannot add new a Course incase full infor && you arenot Admin', () => __awaiter(this, void 0, void 0, function* () {
        let startDate;
        startDate = new Date('2018-01-25');
        let endDate;
        endDate = new Date('2018-05-14');
        const body = {
            name: 'FEC246',
            numberSession: 12,
            startDate,
            endDate,
            tuition: 5000000,
            detailInfor: 'Advance Englist'
        };
        const response = yield request(app_1.app).post('/room/')
            .send({ name: 'E101', numberSeat: 300 })
            .set({ token: 'afasdfka.asfhsaf' });
        assert.equal(response.status, 404);
    }));
});
