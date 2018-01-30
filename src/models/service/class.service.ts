import { Class } from '../Class';
import { Course } from '../Course';
import { Room } from '../Room';
import { ScheduleRoom } from '../ScheduleRoom';
import { ScheduleTeacher } from '../ScheduleTeacher';
import { Student } from '../Student';
import { Teacher } from '../Teacher';
import { ScheduleRoomService } from './scheduleRoom.service';
import { ScheduleTeacherService } from './scheduleTeacher.service';

function checkOverlapDate(s1: Date, e1: Date, s2: Date, e2: Date) {
    const start1 = s1.getTime();
    const start2 = s2.getTime();
    const end1 = e1.getTime();
    const end2 = e2.getTime();
    return (start2 >= start1 && start2 <= end1) ||
        (start1 >= start2 && end1 <= start2);
}

export class ClassService {
    static async addClass(
        name: string,
        idCourse: string,
        idRoom: string,
        idTeacher: string,
        level: string,
        startTime: Date,
        endTime: Date,
        dayOfWeek: number
    ) {
        const course = await Course.findById(idCourse);
        if (!course) throw new Error('Course invalid');
        const teacher = await Teacher.findById(idTeacher);
        if (!teacher) throw new Error('Teacher invalid');
        const room = await Room.findById(idRoom);
        if (!room) throw new Error('Room invalid');
        // Kiem tra trung lich giao vien && room
        const scheduleTeachers = await ScheduleTeacher.find({ idTeacher: teacher._id }) as [ScheduleTeacher];
        const scheduleRooms = await ScheduleRoom.find({ idRoom: room._id }) as [ScheduleRoom];
        scheduleTeachers.forEach(element => {
            if (checkOverlapDate(new Date(startTime), new Date(endTime), new Date(element.startTime), new Date(element.endTime)))
                throw new Error('Teacher busy');
        });
        scheduleRooms.forEach(element => {
            if (element.dayOfWeek === dayOfWeek && checkOverlapDate(startTime, endTime, element.startTime, element.endTime))
                throw new Error('Room Busy');
        });
        // if (checkBusy(scheduleTeachers, dayOfWeek, startTime, endTime)) throw new Error('Teacher Busy');
        // if (checkBusy(scheduleRooms, dayOfWeek, startTime, endTime)) throw new Error('Room Busy');
        const cl = new Class({ name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek });
        await cl.save();
        await ScheduleTeacherService.addScheduleTeacher(idTeacher, startTime, endTime, dayOfWeek);
        await ScheduleRoomService.addScheduleRoom(dayOfWeek, startTime, endTime, idRoom);
        return cl;
    }

    static async deleteClass(idClass: string) {
        // const Class = await Class.findOne({ idClass }) as Class;
        // if (Class) throw new Error('Class is removing dependence the Schedule Class');
        const classRemoved = await Class.findByIdAndRemove(idClass) as Class;
        if (!classRemoved) throw new Error('idClass not found');
        return classRemoved;
    }

    static async updateClass(
        idClass: string,
        newName: string,
        newIdCourse: string,
        newIdTeacher: string,
        newIdScheduleRoom: string,
        newLevel: string,
    ) {
        // const scheduleClass = await ScheduleClass.findOne({ idClass }) as ScheduleClass;
        // if (scheduleClass) throw new Error('Class is updating dependence the Schedule Class');
        const newClass = await Class.findByIdAndUpdate(idClass,
            {
                name: newName,
                idCourse: newIdCourse,
                idTeacher: newIdTeacher,
                idScheduleRoom: newIdScheduleRoom,
                level: newLevel,
            }, { new: true }) as Class;
        if (!newClass) throw new Error('idClass not found');
        return newClass;
    }

    static async addStudentToClass(idClass: string, idStudent: string) {
        const newClass = await Class.findByIdAndUpdate(idClass, {
            $addToSet: {
                students: idStudent
            }
        }, { new: true }) as Class;
        if (!newClass) throw new Error('idClass not found');
        return newClass;
    }
}