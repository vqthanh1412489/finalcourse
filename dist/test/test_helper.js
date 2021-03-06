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
const Admin_1 = require("../src/models/Admin");
const Class_1 = require("../src/models/Class");
const Course_1 = require("../src/models/Course");
const Room_1 = require("../src/models/Room");
const ScheduleRoom_1 = require("../src/models/ScheduleRoom");
const ScheduleTeacher_1 = require("../src/models/ScheduleTeacher");
const Student_1 = require("../src/models/Student");
const Teacher_1 = require("../src/models/Teacher");
require("../src/startDatabase");
beforeEach('Remove all Database TEST', () => __awaiter(this, void 0, void 0, function* () {
    yield Admin_1.Admin.remove({});
    yield Teacher_1.Teacher.remove({});
    yield Room_1.Room.remove({});
    yield ScheduleRoom_1.ScheduleRoom.remove({});
    yield Student_1.Student.remove({});
    yield Course_1.Course.remove({});
    yield Class_1.Class.remove({});
    yield ScheduleTeacher_1.ScheduleTeacher.remove({});
}));
