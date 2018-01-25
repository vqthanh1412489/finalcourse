"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true, trim: true },
    numberSession: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tuition: { type: Number, required: true, trim: true },
    detailInfor: { type: String, trim: true },
    listClass: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Class' }]
});
const CourseMongo = mongoose_1.model('Course', courseSchema);
class Course extends CourseMongo {
}
exports.Course = Course;
