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
const Class_1 = require("../../../src/models/Class");
const Course_1 = require("../../../src/models/Course");
const Room_1 = require("../../../src/models/Room");
const class_service_1 = require("../../../src/models/service/class.service");
const course_service_1 = require("../../../src/models/service/course.service");
const room_service_1 = require("../../../src/models/service/room.service");
const scheduleRoom_service_1 = require("../../../src/models/service/scheduleRoom.service");
const teacher_service_1 = require("../../../src/models/teacher.service");
describe('update Schedule for Class Router', () => {
    let tk;
    let idCourse1;
    let idTeacher1;
    let idRoom1;
    let idClass;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new 2 Room - Add Class', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
        const teacher = yield teacher_service_1.TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234', ['Toiec', 'Tofel'], '123');
        idTeacher1 = teacher._id;
        yield course_service_1.CourseService.addCourse('ENGLISH', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = yield Course_1.Course.findOne({ name: 'ENGLISH' });
        idCourse1 = course._id;
        yield room_service_1.RoomService.addRoom('E102', 1000);
        const room1 = yield Room_1.Room.findOne({ name: 'E102' });
        idRoom1 = room1._id;
        // Add class
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(19);
        endTime.setUTCMinutes(30);
        yield class_service_1.ClassService.addClass('FFFC142', idCourse1, idRoom1, idTeacher1, 'Lowww', startTime, endTime, 2);
        const cl = yield Class_1.Class.findOne({ name: 'FFFC142' });
        idClass = cl._id;
        // Add Schedule Room
        let startTime1;
        startTime1 = new Date();
        let endTime1;
        endTime1 = new Date();
        startTime1.setUTCHours(15);
        startTime1.setUTCMinutes(0);
        endTime1.setUTCHours(16);
        endTime1.setUTCMinutes(30);
        yield scheduleRoom_service_1.ScheduleRoomService.addScheduleRoom(2, startTime1, endTime1, idRoom1);
    }));
    xit('KT can update Schedule Class incase Have idClass - fulll new Data && You are Admin', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(19);
        startTime.setUTCMinutes(30);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const body = {
            newDayOfWeek: 3,
            newStartTime: startTime,
            newEndTime: endTime
        };
        const res = yield request(app_1.app).put(`/class/updateScheduleClass/${idClass}`)
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    xit('KT canNOT update Schedule Class incase Have idClass - new Data && You are NOT Admin', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(19);
        startTime.setUTCMinutes(30);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const body = {
            newDayOfWeek: 3,
            newStartTime: startTime,
            newEndTime: endTime
        };
        const res = yield request(app_1.app).put(`/class/updateScheduleClass/${idClass}`)
            .send(body)
            .set({ token: 'tk' });
        assert.equal(res.status, 404);
    }));
    xit('KT canNOT update Schedule Class incase Have idClass - new Data && You are Admin && Room is busied', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(15);
        startTime.setUTCMinutes(30);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const body = {
            newDayOfWeek: 2,
            newStartTime: startTime,
            newEndTime: endTime
        };
        const res = yield request(app_1.app).put(`/class/updateScheduleClass/${idClass}`)
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 404);
    }));
    it('KT can update Schedule Class incase Have idClass - new Data && You are Admin && Room is not busied', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(16);
        startTime.setUTCMinutes(29);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);
        const body = {
            newDayOfWeek: 2,
            newStartTime: startTime,
            newEndTime: endTime
        };
        const res = yield request(app_1.app).put(`/class/updateScheduleClass/${idClass}`)
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
});
