import mongoose = require('mongoose');
import { model, Schema } from 'mongoose';
import { Room } from './Room';

const ScheduleRoomSchema = new Schema({
    dayOfWeek: { type: Number, required: true, trim: true, min: 2, max: 8 },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    idRoom: { type: Schema.Types.ObjectId, ref: 'Room' }
});

const ScheduleRoomMongo = model('ScheduleRoom', ScheduleRoomSchema);

export class ScheduleRoom extends ScheduleRoomMongo {
    dayOfWeek: number;
    startTime: Date;
    endTime: Date;
    idRoom: Room;
}