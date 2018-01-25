import mongoose = require('mongoose');
import { model, Schema } from 'mongoose';
import { Course } from './Course';
import { ScheduleRoom } from './ScheduleRoom';
import { Student } from './Student';
import { Teacher } from './Teacher';

const ClassSchema = new Schema({
    name: { type: String, unique: true, required: true, trim: true },
    idCourse: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
    idTeacher: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student'}],
    idScheduleRoom: { type: Schema.Types.ObjectId, ref: 'ScheduleRoom', required: true},
    level: { type: String, required: true, trim: true }
});

const ClassMongo  = model('Class', ClassSchema);

export class Class extends ClassMongo {
    _id: string;
    name: string;
    idCourse: Course;
    idTeacher: Teacher;
    students: [Student];
    idScheduleRoom: ScheduleRoom;
    level: string;
}