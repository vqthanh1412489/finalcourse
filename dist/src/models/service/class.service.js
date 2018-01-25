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
const ScheduleRoom_1 = require("../ScheduleRoom");
const Teacher_1 = require("../Teacher");
class ClassService {
    static addClass(name, idCourse, idTeacher, idScheduleRoom, level) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield Course_1.Course.findById(idCourse);
            if (!course)
                throw new Error('Course invalid');
            const teacher = yield Teacher_1.Teacher.findById(idTeacher);
            if (!teacher)
                throw new Error('Teacher invalid');
            const scheduleRoom = yield ScheduleRoom_1.ScheduleRoom.findById(idScheduleRoom);
            if (!scheduleRoom)
                throw new Error('Schedule Room invalid');
            const cl = new Class_1.Class({ name, idCourse, idTeacher, idScheduleRoom, level });
            yield cl.save();
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
