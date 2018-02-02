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
const teacher_service_1 = require("../../../src/models/teacher.service");
const scheduleTeacher_service_1 = require("../../../src/models/service/scheduleTeacher.service");
describe.only('update Teacher Class Router', () => {
    let tk;
    let idCourse1;
    let idTeacher1;
    let idTeacher2;
    let idRoom1;
    let idClass;
    beforeEach('Add new a Admin - new 2 Teacher - new a Course - new  Room - Add Class', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
        const teacher = yield teacher_service_1.TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234', ['Toiec', 'Tofel'], '123');
        idTeacher1 = teacher._id;
        const teacher2 = yield teacher_service_1.TeacherService.signUpTeacher('tea2', '123', 'teacher2', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234', ['Toiec', 'Tofel'], '123');
        idTeacher2 = teacher2._id;
        yield course_service_1.CourseService.addCourse('ENGLISH', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = yield Course_1.Course.findOne({ name: 'ENGLISH' });
        idCourse1 = course._id;
        yield room_service_1.RoomService.addRoom('E102', 1000);
        const room1 = yield Room_1.Room.findOne({ name: 'E102' });
        idRoom1 = room1._id;
        // Add Class
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();
        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(19);
        endTime.setUTCMinutes(30);
        yield class_service_1.ClassService.addClass('RTT333', idCourse1, idRoom1, idTeacher1, 'Normallll', startTime, endTime, 2);
        const cl = yield Class_1.Class.findOne({ name: 'RTT333' });
        idClass = cl._id;
        // Add Schedule Teacher
        let startTime1;
        startTime1 = new Date();
        let endTime1;
        endTime1 = new Date();
        startTime1.setUTCHours(20);
        startTime1.setUTCMinutes(0);
        endTime1.setUTCHours(20);
        endTime1.setUTCMinutes(30);
        yield scheduleTeacher_service_1.ScheduleTeacherService.addScheduleTeacher(idTeacher2, startTime1, endTime1, 2);
    }));
    xit('KT can update Teacher Class incase Have idClass - idNewTeacher && You are Admin', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            idNewTeacher: idTeacher2
        };
        const res = yield request(app_1.app).put(`/class/updateTeacherClass/${idClass}`)
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    xit('KT canNOT update Teacher Class incase Have idClass - idNewTeacher && You are NOT Admin', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            idNewTeacher: idTeacher2
        };
        const res = yield request(app_1.app).put(`/class/updateTeacherClass/${idClass}`)
            .send(body)
            .set({ token: 'tk' });
        assert.equal(res.status, 404);
    }));
    it('KT can update Teacher Class incase Have idClass - idNewTeacher && You are Admin && teacher not busy', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            idNewTeacher: idTeacher2
        };
        const res = yield request(app_1.app).put(`/class/updateTeacherClass/${idClass}`)
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    xit('KT canNOT update Teacher Class incase Have idClass - idNewTeacher && You are Admin && teacher busy', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            idNewTeacher: idTeacher2
        };
        const res = yield request(app_1.app).put(`/class/updateTeacherClass/${idClass}`)
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 404);
    }));
});
