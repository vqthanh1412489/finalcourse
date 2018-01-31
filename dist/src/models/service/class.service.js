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
const Room_1 = require("../Room");
const ScheduleRoom_1 = require("../ScheduleRoom");
const ScheduleTeacher_1 = require("../ScheduleTeacher");
const Student_1 = require("../Student");
const Teacher_1 = require("../Teacher");
const course_service_1 = require("./course.service");
const scheduleRoom_service_1 = require("./scheduleRoom.service");
const scheduleTeacher_service_1 = require("./scheduleTeacher.service");
const student_service_1 = require("./student.service");
function checkOverlapDate(s1, e1, s2, e2) {
    const start1 = s1.getTime();
    const start2 = s2.getTime();
    const end1 = e1.getTime();
    const end2 = e2.getTime();
    return (start2 >= start1 && start2 <= end1) ||
        (start1 >= start2 && end1 <= start2);
}
class ClassService {
    static addClass(name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield Course_1.Course.findById(idCourse);
            if (!course)
                throw new Error('Course invalid');
            const teacher = yield Teacher_1.Teacher.findById(idTeacher);
            if (!teacher)
                throw new Error('Teacher invalid');
            const room = yield Room_1.Room.findById(idRoom);
            if (!room)
                throw new Error('Room invalid');
            // Kiem tra trung lich giao vien && room
            const scheduleTeachers = yield ScheduleTeacher_1.ScheduleTeacher.find({ idTeacher: teacher._id });
            const scheduleRooms = yield ScheduleRoom_1.ScheduleRoom.find({ idRoom: room._id });
            scheduleTeachers.forEach(element => {
                if (element.dayOfWeek === dayOfWeek &&
                    checkOverlapDate(new Date(startTime), new Date(endTime), new Date(element.startTime), new Date(element.endTime)))
                    throw new Error('Teacher busy');
            });
            scheduleRooms.forEach(element => {
                if (element.dayOfWeek === dayOfWeek &&
                    checkOverlapDate(new Date(startTime), new Date(endTime), new Date(element.startTime), new Date(element.endTime)))
                    throw new Error('Room busy');
            });
            const cl = new Class_1.Class({ name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek });
            yield cl.save();
            yield scheduleTeacher_service_1.ScheduleTeacherService.addScheduleTeacher(idTeacher, startTime, endTime, dayOfWeek);
            yield scheduleRoom_service_1.ScheduleRoomService.addScheduleRoom(dayOfWeek, startTime, endTime, idRoom);
            const classInfor = yield Class_1.Class.findOne({ name });
            yield course_service_1.CourseService.addClassToCourse(idCourse, classInfor._id);
            return cl;
        });
    }
    static deleteClass(idClass) {
        return __awaiter(this, void 0, void 0, function* () {
            const classRemoved = yield Class_1.Class.findByIdAndRemove(idClass);
            if (!classRemoved)
                throw new Error('idClass not found');
            yield ScheduleTeacher_1.ScheduleTeacher.remove({
                idTeacher: classRemoved.idTeacher,
                startTime: classRemoved.startTime,
                endTime: classRemoved.endTime
            });
            yield ScheduleRoom_1.ScheduleRoom.remove({
                idRoom: classRemoved.idRoom,
                startTime: classRemoved.startTime,
                endTime: classRemoved.endTime
            });
            yield Course_1.Course.findByIdAndUpdate(classRemoved.idCourse, {
                $pull: {
                    listClass: idClass
                }
            });
            const students = classRemoved.students;
            students.forEach((idStudent) => __awaiter(this, void 0, void 0, function* () {
                const student = yield Student_1.Student.findById(idStudent);
                const listClass = student.listClass;
                listClass.forEach(element => {
                    if (element.toString() === idClass) {
                        student_service_1.StudentService.removeClassToStudent(student._id, idClass);
                    }
                });
            }));
            return classRemoved;
        });
    }
    static updateName_Level_Class(idClass, newName, newLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClass = yield Class_1.Class.findByIdAndUpdate(idClass, {
                name: newName,
                level: newLevel,
            }, { new: true });
            if (!newClass)
                throw new Error('idClass not found');
            return newClass;
        });
    }
    static updateRoom_Class(idClass, idNewRoom) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClass = yield Class_1.Class.findByIdAndUpdate(idClass, {
                idRoom: idNewRoom
            }, { new: true });
            const oldClass = yield Class_1.Class.findById(idClass);
            yield scheduleRoom_service_1.ScheduleRoomService.updateScheduleRoom();
        });
    }
    static addStudentToClass(idClass, idStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClass = yield Class_1.Class.findByIdAndUpdate(idClass, {
                $addToSet: {
                    students: idStudent
                }
            }, { new: true });
            if (!newClass)
                throw new Error('idClass not found');
            student_service_1.StudentService.addClassToStudent(idStudent, idClass);
            return newClass;
        });
    }
}
exports.ClassService = ClassService;
