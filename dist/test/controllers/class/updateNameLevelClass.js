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
const student_service_1 = require("../../../src/models/service/student.service");
const Student_1 = require("../../../src/models/Student");
const teacher_service_1 = require("../../../src/models/teacher.service");
describe('update Class Router', () => {
    let tk;
    let idCourse1;
    let idCourse2;
    let idTeacher1;
    let idTeacher2;
    let idRoom;
    let idClass;
    let idStudent;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new Room - Add Class - Add Studen to cLass', () => __awaiter(this, void 0, void 0, function* () {
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
        yield course_service_1.CourseService.addCourse('Franch', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course2 = yield Course_1.Course.findOne({ name: 'ENGLISH' });
        idCourse2 = course2._id;
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
        yield class_service_1.ClassService.addClass('FFFC142', idCourse1, idRoom, idTeacher1, 'Bacsicc', startTime, endTime, 2);
        const cl = yield Class_1.Class.findOne({ name: 'FFFC142' });
        idClass = cl._id;
        yield student_service_1.StudentService.signUpStudent('student6', '123', 'Student 6', 'std5@gmail.com', 'Hoang dieu 2', '01698310295', 0, 0);
        const student = yield Student_1.Student.findOne({ username: 'student6' });
        idStudent = student._id;
        yield class_service_1.ClassService.addStudentToClass(idClass, idStudent);
    }));
    it('KT can update Name_Level Class incase Have idClass && You are Admin', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            name: 'BBG221',
            level: 'High'
        };
        const res = yield request(app_1.app).put(`/class/updateNameLevel/${idClass}`)
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
});
