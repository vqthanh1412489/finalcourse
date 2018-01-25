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
const Class_1 = require("../Class");
const Course_1 = require("../Course");
class CourseService {
    static addCourse(name, numberSession, startDate, endDate, tuition, detailInfor) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = new Course_1.Course({ name, numberSession, startDate, endDate, tuition, detailInfor });
            yield course.save();
            return course;
        });
    }
    static deleteCourse(idCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            // const course = await Course.findOne({ idCourse }) as Course;
            // if (course) throw new Error('Course is removing dependence the Schedule Course');
            const courseRemoved = yield Course_1.Course.findByIdAndRemove(idCourse);
            if (!courseRemoved)
                throw new Error('idCourse not found');
            return courseRemoved;
        });
    }
    static updateCourse(idCourse, newName, newNumberSession, newStartDate, newEndDate, newTuition, newDetailInfor) {
        return __awaiter(this, void 0, void 0, function* () {
            // const scheduleCourse = await ScheduleCourse.findOne({ idCourse }) as ScheduleCourse;
            // if (scheduleCourse) throw new Error('Course is updating dependence the Schedule Course');
            const course = yield Course_1.Course.findByIdAndUpdate(idCourse, {
                name: newName,
                numberSession: newNumberSession,
                startDate: newStartDate,
                endDate: newEndDate,
                tuition: newTuition,
                detailInfor: newDetailInfor
            }, { new: true });
            if (!course)
                throw new Error('idCourse not found');
            return course;
        });
    }
    static addClassToCourse(idCourse, idClass) {
        return __awaiter(this, void 0, void 0, function* () {
            const cl = yield Class_1.Class.findById(idClass);
            if (!cl)
                throw new Error('idClass not found');
            const newCourse = yield Course_1.Course.findByIdAndUpdate(idCourse, {
                $addToSet: {
                    listClass: idClass
                }
            }, { new: true });
            if (!newCourse)
                throw new Error('idCourse not found');
            return newCourse;
        });
    }
}
exports.CourseService = CourseService;
