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
const ScheduleTeacher_1 = require("../ScheduleTeacher");
const Teacher_1 = require("../Teacher");
class ScheduleTeacherService {
    static addScheduleTeacher(idTeacher, startTime, endTime, dayOfWeek) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield Teacher_1.Teacher.findById(idTeacher);
            if (!teacher)
                throw new Error('Teacher not found');
            const scheduleTeacher = new ScheduleTeacher_1.ScheduleTeacher({ idTeacher, startTime, endTime, dayOfWeek });
            yield scheduleTeacher.save();
            return scheduleTeacher;
        });
    }
    static deleteScheduleTeacher(idScheduleTeacher) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ScheduleTeacher_1.ScheduleTeacher.findByIdAndRemove(idScheduleTeacher);
        });
    }
    static updateScheduleTeacher(idScheduleTeacher, newIdTeacher, newStartTime, newEndTime, newDayOfWeek) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ScheduleTeacher_1.ScheduleTeacher.findByIdAndUpdate(idScheduleTeacher, {
                dayOfWeek: newDayOfWeek,
                startTime: newStartTime,
                endTime: newEndTime,
                idTeacher: newIdTeacher
            }, { new: true });
        });
    }
}
exports.ScheduleTeacherService = ScheduleTeacherService;
