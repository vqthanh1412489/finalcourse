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
const course_service_1 = require("../../../src/models/service/course.service");
describe('update scheduleRoom Router', () => {
    let tk;
    let idCourse;
    beforeEach('Add new a Admin - Add new Course', () => __awaiter(this, void 0, void 0, function* () {
        const birthDay = new Date('1995-09-30');
        yield admin_service_1.AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = yield admin_service_1.AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
        yield course_service_1.CourseService.addCourse('BBG357', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = yield Course_1.Course.findOne({ name: 'BBG357' });
        idCourse = course._id;
    }));
    xit('KT can Update Course incase Admin && idCourse', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            name: 'FEC357',
            numberSession: 12,
            startDate: new Date('2018-01-25'),
            endDate: new Date('2018-05-14'),
            tuition: 5000000,
            detailInfor: 'Basic Englist'
        };
        const res = yield request(app_1.app).put(`/course/${idCourse}`)
            .send(body)
            .set({ token: tk });
        assert.equal(res.status, 200);
    }));
    it('KT cannot Update Course incase not Admin && idScheduleRoom', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            name: 'FEC357',
            numberSession: 12,
            startDate: new Date('2018-01-25'),
            endDate: new Date('2018-05-14'),
            tuition: 5000000,
            detailInfor: 'Basic Englist'
        };
        const res = yield request(app_1.app).put(`/scheduleRoom/${idCourse}`)
            .send(body)
            .set({ token: 'asdfsfica' });
        assert.equal(res.status, 404);
    }));
});
