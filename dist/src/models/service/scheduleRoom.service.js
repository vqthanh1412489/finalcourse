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
class ScheduleRoomService {
    static addScheduleRoom(dayOfWeek, startTime, endTime, idRoom) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield Room_1.Room.findById(idRoom);
            if (!room)
                throw new Error('Room not found');
            const scheduleRoom = new ScheduleRoom_1.ScheduleRoom({ dayOfWeek, startTime, endTime, idRoom });
            yield scheduleRoom.save();
            return scheduleRoom;
        });
    }
    static deleteScheduleRoom(idScheduleRoom) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ScheduleRoom_1.ScheduleRoom.findByIdAndRemove(idScheduleRoom);
        });
    }
    static updateScheduleRoom(idScheduleRoom, newDayOfWeek, newStartTime, newEndTime, newIdRoom) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ScheduleRoom_1.ScheduleRoom.findByIdAndUpdate(idScheduleRoom, {
                newDayOfWeek,
                newStartTime,
                newEndTime,
                newIdRoom
            }, { new: true });
        });
    }
}
exports.ScheduleRoomService = ScheduleRoomService;
