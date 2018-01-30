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
const Teacher_1 = require("../../../src/models/Teacher");
const teacher_service_1 = require("../../../src/models/teacher.service");
describe('add ScheduleTeacher Router', () => {
    let tk;
    let idTeacher;
    beforeEach('Add new a Admin - Add new Teacher', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
        yield teacher_service_1.TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234', ['Toiec', 'Tofel'], '123');
        const teacher = yield Teacher_1.Teacher.findOne({ username: 'tea1' });
        idTeacher = teacher._id;
    }));
    it('KT can add new a ScheduleTeacher incase full infor && you are Admin', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(19);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = yield request(app_1.app).post('/scheduleTeacher/')
            .send({ idTeacher, startTime, endTime, dayOfWeek: 7 })
            .set({ token: tk });
        assert.equal(response.status, 200);
    }));
    it('KT cannot add new a ScheduleTeacher incase you arenot Admin', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(19);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = yield request(app_1.app).post('/scheduleTeacher/')
            .send({ idTeacher, startTime, endTime, dayOfWeek: 7 })
            .set({ token: 'tk' });
        assert.equal(response.status, 404);
    }));
    it('KT cannot add new a ScheduleTeacher incase is Admin && invalid Teacher', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = yield request(app_1.app).post('/ScheduleTeacher/')
            .send({ idTeacher: 'kahsfslfjlalsfasfm', startTime, endTime, dayOfWeek: 7 })
            .set({ token: tk });
        assert.equal(response.status, 404);
    }));
});
