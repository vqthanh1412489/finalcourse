import { Room } from '../Room';
import { ScheduleRoom } from '../ScheduleRoom';

export class ScheduleRoomService {
    static async addScheduleRoom(
        dayOfWeek: number,
        startTime: Date,
        endTime: Date,
        idRoom: Room
    ) {
        const room = await Room.findById(idRoom);
        if (!room) throw new Error('Room not found');
        const scheduleRoom = new ScheduleRoom({ dayOfWeek, startTime, endTime, idRoom });
        await scheduleRoom.save();
        return scheduleRoom;
    }

    static async deleteScheduleRoom(idScheduleRoom: string) {
        return await ScheduleRoom.findByIdAndRemove(idScheduleRoom) as ScheduleRoom;
    }

    static async updateScheduleRoom(
        idScheduleRoom: string,
        newDayOfWeek: Date,
        newStartTime: Date,
        newEndTime: Date,
        newIdRoom: Date) {
        return await ScheduleRoom.findByIdAndUpdate(idScheduleRoom,
            {
                newDayOfWeek,
                newStartTime,
                newEndTime,
                newIdRoom
            }, { new: true }) as ScheduleRoom;
    }
}