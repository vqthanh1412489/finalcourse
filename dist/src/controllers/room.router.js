"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const adminMiddleWare_1 = require("../models/adminMiddleWare");
const room_service_1 = require("../models/service/room.service");
exports.roomRouter = express_1.Router();
exports.roomRouter.use(body_parser_1.json());
exports.roomRouter.use(adminMiddleWare_1.adminMiddleWare);
exports.roomRouter.post('/', (req, res) => {
    const { name, numberSeat } = req.body;
    room_service_1.RoomService.addRoom(name, numberSeat)
        .then(room => res.send({ success: true, room }))
        .catch(err => res.status(404).send({ success: false, message: 'Add Room Fail' }));
});
exports.roomRouter.delete('/:idRoom', (req, res) => {
    const { idRoom } = req.params;
    room_service_1.RoomService.deleteRoom(idRoom)
        .then(room => res.send({ success: true, room }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete Room Fail' }));
});
exports.roomRouter.put('/:idRoom', (req, res) => {
    const { idRoom } = req.params;
    const { newName, newNumberSeat } = req.body;
    room_service_1.RoomService.updateRoom(idRoom, newName, newNumberSeat)
        .then(room => res.send({ success: true, room }))
        .catch(err => res.status(404).send({ success: false, message: 'Update Room Fail' }));
});
