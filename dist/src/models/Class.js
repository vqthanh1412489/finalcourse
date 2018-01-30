"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClassSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true, trim: true },
    idCourse: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Course' },
    idTeacher: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Teacher' },
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Student' }],
    idRoom: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Room' },
    level: { type: String, required: true, trim: true },
    startTime: { type: Date, required: true, trim: true },
    endTime: { type: Date, required: true, trim: true },
    dayOfWeek: { type: Number, required: true, trim: true }
});
const ClassMongo = mongoose_1.model('Class', ClassSchema);
class Class extends ClassMongo {
}
exports.Class = Class;
