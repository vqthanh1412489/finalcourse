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
const ScheduleRoom_1 = require("../../../src/models/ScheduleRoom");
const room_service_1 = require("../../../src/models/service/room.service");
const scheduleRoom_service_1 = require("../../../src/models/service/scheduleRoom.service");
describe('delete scheduleRoom Router', () => {
    let tk;
    let idRoom;
    let idSchedule;
    beforeEach('Add new a Admin - Add new Room - Add new ScheduleRoom', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
        yield room_service_1.RoomService.addRoom('E102', 1000);
        const room = yield Room_1.Room.findOne({ name: 'E102' });
        idRoom = room._id;
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        yield scheduleRoom_service_1.ScheduleRoomService.addScheduleRoom(4, startTime, endTime, idRoom);
        const schedule = yield ScheduleRoom_1.ScheduleRoom.findOne({ dayOfWeek: 4, idRoom });
        idSchedule = schedule._id;
    }));
    xit('KT can Delete ScheduleRoom incase Admin && idScheduleRoom', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/scheduleRoom/${idSchedule}`)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    it('KT cannot Delete ScheduleRoom incase not Admin && idScheduleRoom', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/scheduleRoom/${idSchedule}`)
            .set({ token: 'asdfsfica' });
        assert.equal(res.status, 404);
    }));
});
