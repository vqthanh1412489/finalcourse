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
const ScheduleRoom_1 = require("../../../src/models/ScheduleRoom");
const course_service_1 = require("../../../src/models/service/course.service");
const room_service_1 = require("../../../src/models/service/room.service");
const scheduleRoom_service_1 = require("../../../src/models/service/scheduleRoom.service");
const teacher_service_1 = require("../../../src/models/teacher.service");
describe('add Class Router', () => {
    let tk;
    let idCourse;
    let idTeacher;
    let idRoom;
    let idScheduleRoom;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new Schedule', () => __awaiter(this, void 0, void 0, function* () {
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
        idScheduleRoom = schedule._id;
    }));
    it('KT can add new a Class incase full infor && you are Admin', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            name: 'FEC357',
            idCourse,
            idTeacher,
            idScheduleRoom,
            level: 'Basic'
        };
        const response = yield request(app_1.app).post('/class/')
            .send(body)
            .set({ token: tk });
        assert.equal(response.status, 200);
    }));
});
