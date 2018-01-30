"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduleTeacherSchema = new mongoose_1.Schema({
    idTeacher: { type: mongoose_1.Schema.Types.ObjectId, required: true, trim: true, ref: 'Teacher' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    dayOfWeek: { type: Number, required: true, trim: true, min: 2, max: 8 }
});
const ScheduleTeacherMongo = mongoose_1.model('ScheduleTeacher', ScheduleTeacherSchema);
class ScheduleTeacher extends ScheduleTeacherMongo {
}
exports.ScheduleTeacher = ScheduleTeacher;
