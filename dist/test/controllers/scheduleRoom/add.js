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
const Room_1 = require("../../../src/models/Room");
const room_service_1 = require("../../../src/models/service/room.service");
describe.only('add scheduleRoom Router', () => {
    let tk;
    let idRoom;
    beforeEach('Add new a Admin - Add new Room', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
        yield room_service_1.RoomService.addRoom('E102', 500);
        const room = yield Room_1.Room.findOne({ name: 'E102' });
        idRoom = room._id;
    }));
    xit('KT can add new a ScheduleRoom incase full infor && you are Admin', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = yield request(app_1.app).post('/scheduleRoom/')
            .send({ dayOfWeek: 2, startTime, endTime, idRoom })
            .set({ token: tk });
        assert.equal(response.status, 200);
    }));
    it('KT cannot add new a scheduleRoom incase you arenot Admin', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = yield request(app_1.app).post('/scheduleRoom/')
            .send({ dayOfWeek: 2, startTime, endTime, idRoom })
            .set({ token: 'sdfsfsf.asfsff' });
        assert.equal(response.status, 404);
    }));
});
