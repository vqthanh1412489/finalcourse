import { Room } from '../Room';
import { ScheduleRoom } from '../ScheduleRoom';

export class RoomService {
    static async addRoom(name: string, numberSeat: number) {
            const room = new Room({ name, numberSeat });
            await room.save();
            return room;
    }

    static async deleteRoom(idRoom: string) {
        const scheduleRoom = await ScheduleRoom.findOne({ idRoom }) as ScheduleRoom;
        if (scheduleRoom) throw new Error('Room is removing dependence the Schedule Room');
        const roomRemoved = await Room.findByIdAndRemove(idRoom) as Room;
    }

    static async updateRoom(idRoom: string, newName: string, newNumberSeat: number) {
        const scheduleRoom = await ScheduleRoom.findOne({ idRoom }) as ScheduleRoom;
        if (scheduleRoom) throw new Error('Room is updating dependence the Schedule Room');
        return await Room.findByIdAndUpdate(idRoom, { name: newName, numberSeat: newNumberSeat }, { new: true }) as Room;
    }
}