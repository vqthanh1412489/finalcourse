"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduleRoomSchema = new mongoose_1.Schema({
    dayOfWeek: { type: Number, required: true, trim: true, min: 2, max: 8 },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    idRoom: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room' }
});
const ScheduleRoomMongo = mongoose_1.model('ScheduleRoom', ScheduleRoomSchema);
class ScheduleRoom extends ScheduleRoomMongo {
}
exports.ScheduleRoom = ScheduleRoom;
