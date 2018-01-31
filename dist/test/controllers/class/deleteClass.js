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
const ScheduleRoom_1 = require("../../../src/models/ScheduleRoom");
const ScheduleTeacher_1 = require("../../../src/models/ScheduleTeacher");
const class_service_1 = require("../../../src/models/service/class.service");
const course_service_1 = require("../../../src/models/service/course.service");
const room_service_1 = require("../../../src/models/service/room.service");
const student_service_1 = require("../../../src/models/service/student.service");
const Student_1 = require("../../../src/models/Student");
const teacher_service_1 = require("../../../src/models/teacher.service");
describe('delete Class Router', () => {
    let tk;
    let idCourse;
    let idTeacher;
    let idRoom;
    let idClass;
    let idStudent;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new Room - Add Class - Add Studen to cLass', () => __awaiter(this, void 0, void 0, function* () {
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
        startTime.setUTCHours(19);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);
        yield class_service_1.ClassService.addClass('FFFC142', idCourse, idRoom, idTeacher, 'Bacsicc', startTime, endTime, 2);
        const cl = yield Class_1.Class.findOne({ name: 'FFFC142' });
        idClass = cl._id;
        yield student_service_1.StudentService.signUpStudent('student6', '123', 'Student 6', 'std5@gmail.com', 'Hoang dieu 2', '01698310295', 0, 0);
        const student = yield Student_1.Student.findOne({ username: 'student6' });
        idStudent = student._id;
        yield class_service_1.ClassService.addStudentToClass(idClass, idStudent);
    }));
    xit('KT can delete Class incase Have idClass && You are Admin', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/class/${idClass}`)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    xit('KT canNOT delete Class incase Have idClass && You are NOT Admin', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/class/${idClass}`)
            .set({ token: 'tk' });
        assert.equal(res.status, 404);
    }));
    xit('KT canNOT delete Class incase wrong idClass && You are Admin', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/class/lasfnwassf`)
            .set({ token: tk });
        assert.equal(res.status, 404);
    }));
    it('KT If delete the Class, Schedule Teacher, Schedule Room is removed, Student and course is Updated', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app_1.app).delete(`/class/${idClass}`)
            .set({ token: tk });
        const countScheduleRoom = yield ScheduleRoom_1.ScheduleRoom.count({});
        const countScheduleTeacher = yield ScheduleTeacher_1.ScheduleTeacher.count({});
        const course = yield Course_1.Course.findById(idCourse);
        const countClassInCourse = course.listClass.length;
        const student = yield Student_1.Student.findById(idStudent);
        const countClassInStudent = course.listClass.length;
        assert.equal(countScheduleTeacher, 0);
        assert.equal(countScheduleRoom, 0);
        assert.equal(countClassInStudent, 0);
        assert.equal(countScheduleTeacher, 0);
        assert.equal(res.status, 200);
    }));
});
