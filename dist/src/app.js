"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const admin_router_1 = require("./controllers/admin.router");
const room_router_1 = require("./controllers/room.router");
const scheduleRoom_router_1 = require("./controllers/scheduleRoom.router");
const teacher_router_1 = require("./controllers/teacher.router");
exports.app = express();
exports.app.use(cors());
exports.app.use('/admin', admin_router_1.adminRouter);
exports.app.use('/teacher', teacher_router_1.teacherRouter);
exports.app.use('/room', room_router_1.roomRouter);
exports.app.use('/scheduleRoom', scheduleRoom_router_1.scheduleRoomRouter);
exports.app.get('/', (req, res) => {
    res.send('Vu Quoc Thanh');
});
