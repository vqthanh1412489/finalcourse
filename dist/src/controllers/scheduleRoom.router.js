"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const adminMiddleWare_1 = require("../models/adminMiddleWare");
const scheduleRoom_service_1 = require("../models/service/scheduleRoom.service");
exports.scheduleRoomRouter = express_1.Router();
exports.scheduleRoomRouter.use(body_parser_1.json());
exports.scheduleRoomRouter.use(adminMiddleWare_1.adminMiddleWare);
exports.scheduleRoomRouter.post('/', (req, res) => {
    const { dayOfWeek, startTime, endTime, idRoom } = req.body;
    scheduleRoom_service_1.ScheduleRoomService.addScheduleRoom(dayOfWeek, startTime, endTime, idRoom)
        .then(scheduleRoom => res.send({ success: true, scheduleRoom }))
        .catch(err => res.status(404).send({ success: false, message: 'Add ScheduleRoom Fail' }));
});
exports.scheduleRoomRouter.delete('/:idScheduleRoom', (req, res) => {
    const { idScheduleRoom } = req.params;
    scheduleRoom_service_1.ScheduleRoomService.deleteScheduleRoom(idScheduleRoom)
        .then(scheduleRoom => res.send({ success: true, scheduleRoom }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete ScheduleRoom Fail' }));
});
exports.scheduleRoomRouter.put('/:idScheduleRoom', (req, res) => {
    const { idScheduleRoom } = req.params;
    const { newDayOfWeek, newStartTime, newEndTime, newIdRoom } = req.body;
    scheduleRoom_service_1.ScheduleRoomService.updateScheduleRoom(idScheduleRoom, newDayOfWeek, newStartTime, newEndTime, newIdRoom)
        .then(scheduleRoom => res.send({ success: true, scheduleRoom }))
        .catch(err => res.status(404).send({ success: false, message: 'Update ScheduleRoom Fail' }));
});
