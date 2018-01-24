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
const Room_1 = require("../Room");
const ScheduleRoom_1 = require("../ScheduleRoom");
class RoomService {
    static addRoom(name, numberSeat) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = new Room_1.Room({ name, numberSeat });
            yield room.save();
            return room;
        });
    }
    static deleteRoom(idRoom) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduleRoom = yield ScheduleRoom_1.ScheduleRoom.findOne({ idRoom });
            if (scheduleRoom)
                throw new Error('Room is removing dependence the Schedule Room');
            const roomRemoved = yield Room_1.Room.findByIdAndRemove(idRoom);
        });
    }
    static updateRoom(idRoom, newName, newNumberSeat) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduleRoom = yield ScheduleRoom_1.ScheduleRoom.findOne({ idRoom });
            if (scheduleRoom)
                throw new Error('Room is updating dependence the Schedule Room');
            return yield Room_1.Room.findByIdAndUpdate(idRoom, { name: newName, numberSeat: newNumberSeat }, { new: true });
        });
    }
}
exports.RoomService = RoomService;
