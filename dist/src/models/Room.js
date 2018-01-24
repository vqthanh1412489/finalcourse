"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true, trim: true },
    numberSeat: { type: Number, required: true }
});
const RoomMongo = mongoose_1.model('Room', RoomSchema);
class Room extends RoomMongo {
}
exports.Room = Room;
