"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const adminMiddleWare_1 = require("../models/adminMiddleWare");
const scheduleTeacher_service_1 = require("../models/service/scheduleTeacher.service");
exports.scheduleTeacherRouter = express_1.Router();
exports.scheduleTeacherRouter.use(body_parser_1.json());
exports.scheduleTeacherRouter.use(adminMiddleWare_1.adminMiddleWare);
exports.scheduleTeacherRouter.post('/', (req, res) => {
    const { idTeacher, startTime, endTime, dayOfWeek } = req.body;
    scheduleTeacher_service_1.ScheduleTeacherService.addScheduleTeacher(idTeacher, startTime, endTime, dayOfWeek)
        .then(scheduleTeacher => res.send({ success: true, scheduleTeacher }))
        .catch(err => res.status(404).send({ success: false, message: 'Add ScheduleTeacher Fail' }));
});
exports.scheduleTeacherRouter.delete('/:idScheduleTeacher', (req, res) => {
    const { idScheduleTeacher } = req.params;
    scheduleTeacher_service_1.ScheduleTeacherService.deleteScheduleTeacher(idScheduleTeacher)
        .then(scheduleTeacher => res.send({ success: true, scheduleTeacher }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete ScheduleTeacher Fail' }));
});
exports.scheduleTeacherRouter.put('/:idScheduleTeacher', (req, res) => {
    const { idScheduleTeacher } = req.params;
    const { idTeacher, startTime, endTime, dayOfWeek } = req.body;
    scheduleTeacher_service_1.ScheduleTeacherService.updateScheduleTeacher(idScheduleTeacher, idTeacher, startTime, endTime, dayOfWeek)
        .then(scheduleTeacher => res.send({ success: true, scheduleTeacher }))
        .catch(err => res.status(404).send({ success: false, message: 'Update ScheduleTeacher Fail' }));
});
