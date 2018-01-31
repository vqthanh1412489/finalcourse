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
const Course_1 = require("../../../src/models/Course");
const Room_1 = require("../../../src/models/Room");
const course_service_1 = require("../../../src/models/service/course.service");
const room_service_1 = require("../../../src/models/service/room.service");
const scheduleRoom_service_1 = require("../../../src/models/service/scheduleRoom.service");
const teacher_service_1 = require("../../../src/models/teacher.service");
describe('add Class Router', () => {
    let tk;
    let idCourse;
    let idTeacher;
    let idRoom;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new a Room', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
        const teacher = yield teacher_service_1.TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234', ['Toiec', 'Tofel'], '123');
        idTeacher = teacher._id;
        yield course_service_1.CourseService.addCourse('ENGLISH', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = yield Course_1.Course.findOne({ name: 'ENGLISH' });
        idCourse = course._id;
        yield room_service_1.RoomService.addRoom('E102', 1000);
        const room = yield Room_1.Room.findOne({ name: 'E102' });
        idRoom = room._id;
        // Add Schedule Teacher
        // let startTime1;
        // startTime1 = new Date();
        // let endTime1;
        // endTime1 = new Date();
        // startTime1.setUTCHours(18);
        // startTime1.setUTCMinutes(0);
        // endTime1.setUTCHours(19);
        // endTime1.setUTCMinutes(0);
        // await ScheduleTeacherService.addScheduleTeacher(idTeacher, startTime1, endTime1, 7);
        // Add Schedule Room
        let startTime2;
        startTime2 = new Date();
        let endTime2;
        endTime2 = new Date();
        startTime2.setUTCHours(18);
        startTime2.setUTCMinutes(0);
        endTime2.setUTCHours(19);
        endTime2.setUTCMinutes(0);
        yield scheduleRoom_service_1.ScheduleRoomService.addScheduleRoom(3, startTime2, endTime2, idRoom);
    }));
    xit('KT can add new a Class incase full infor && you are Admin && teacher - room empty', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const body = {
            name: 'FRC333',
            idCourse,
            idRoom,
            idTeacher,
            level: 'Basic',
            startTime,
            endTime,
            dayOfWeek: 7
        };
        const response = yield request(app_1.app).post('/class/')
            .send(body)
            .set({ token: tk });
        assert.equal(response.status, 200);
    }));
    xit('KT can add new a Class incase full infor && you are Admin && teacher not busy', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(21);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);
        const body = {
            name: 'Thanh123',
            idCourse,
            idRoom,
            idTeacher,
            level: 'High',
            startTime,
            endTime,
            dayOfWeek: 7
        };
        const response = yield request(app_1.app).post('/class/')
            .send(body)
            .set({ token: tk });
        assert.equal(response.status, 200);
    }));
    xit('KT can add new a Class incase full infor && you are Admin && teacher busy', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(15);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);
        const body = {
            name: 'Thanh123',
            idCourse,
            idRoom,
            idTeacher,
            level: 'High',
            startTime,
            endTime,
            dayOfWeek: 3
        };
        const response = yield request(app_1.app).post('/class/')
            .send(body)
            .set({ token: tk });
        assert.equal(response.status, 404);
    }));
    xit('KT canNOT add new a Class incase full infor && you are Admin && room busy', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(15);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);
        const body = {
            name: 'Thanh123',
            idCourse,
            idRoom,
            idTeacher,
            level: 'Low',
            startTime,
            endTime,
            dayOfWeek: 3
        };
        const response = yield request(app_1.app).post('/class/')
            .send(body)
            .set({ token: tk });
        assert.equal(response.status, 404);
    }));
    xit('KT can add new a Class incase full infor && you are Admin && room NOT busy', () => __awaiter(this, void 0, void 0, function* () {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(19);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);
        const body = {
            name: 'Thanh123',
            idCourse,
            idRoom,
            idTeacher,
            level: 'Low',
            startTime,
            endTime,
            dayOfWeek: 3
        };
        const response = yield request(app_1.app).post('/class/')
            .send(body)
            .set({ token: tk });
        assert.equal(response.status, 200);
    }));
});
