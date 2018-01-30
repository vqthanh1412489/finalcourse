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
const Teacher_1 = require("../Teacher");
const scheduleRoom_service_1 = require("./scheduleRoom.service");
const scheduleTeacher_service_1 = require("./scheduleTeacher.service");
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
                if (checkOverlapDate(new Date(startTime), new Date(endTime), new Date(element.startTime), new Date(element.endTime)))
                    throw new Error('Teacher busy');
            });
            scheduleRooms.forEach(element => {
                if (element.dayOfWeek === dayOfWeek && checkOverlapDate(startTime, endTime, element.startTime, element.endTime))
                    throw new Error('Room Busy');
            });
            // if (checkBusy(scheduleTeachers, dayOfWeek, startTime, endTime)) throw new Error('Teacher Busy');
            // if (checkBusy(scheduleRooms, dayOfWeek, startTime, endTime)) throw new Error('Room Busy');
            const cl = new Class_1.Class({ name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek });
            yield cl.save();
            yield scheduleTeacher_service_1.ScheduleTeacherService.addScheduleTeacher(idTeacher, startTime, endTime, dayOfWeek);
            yield scheduleRoom_service_1.ScheduleRoomService.addScheduleRoom(dayOfWeek, startTime, endTime, idRoom);
            return cl;
        });
    }
    static deleteClass(idClass) {
        return __awaiter(this, void 0, void 0, function* () {
            // const Class = await Class.findOne({ idClass }) as Class;
            // if (Class) throw new Error('Class is removing dependence the Schedule Class');
            const classRemoved = yield Class_1.Class.findByIdAndRemove(idClass);
            if (!classRemoved)
                throw new Error('idClass not found');
            return classRemoved;
        });
    }
    static updateClass(idClass, newName, newIdCourse, newIdTeacher, newIdScheduleRoom, newLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            // const scheduleClass = await ScheduleClass.findOne({ idClass }) as ScheduleClass;
            // if (scheduleClass) throw new Error('Class is updating dependence the Schedule Class');
            const newClass = yield Class_1.Class.findByIdAndUpdate(idClass, {
                name: newName,
                idCourse: newIdCourse,
                idTeacher: newIdTeacher,
                idScheduleRoom: newIdScheduleRoom,
                level: newLevel,
            }, { new: true });
            if (!newClass)
                throw new Error('idClass not found');
            return newClass;
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
            return newClass;
        });
    }
}
exports.ClassService = ClassService;
