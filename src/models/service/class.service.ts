import { Class } from '../Class';
import { Course } from '../Course';
import { ScheduleRoom } from '../ScheduleRoom';
import { Student } from '../Student';
import { Teacher } from '../Teacher';

export class ClassService {
    static async addClass(
        name: string,
        idCourse: string,
        idTeacher: string,
        idScheduleRoom: string,
        level: string
    ) {
        const course = await Course.findById(idCourse);
        if (!course) throw new Error('Course invalid');
        const teacher = await Teacher.findById(idTeacher);
        if (!teacher) throw new Error('Teacher invalid');
        const scheduleRoom = await ScheduleRoom.findById(idScheduleRoom);
        if (!scheduleRoom) throw new Error('Schedule Room invalid');
        const cl = new Class({ name, idCourse, idTeacher, idScheduleRoom, level });
        await cl.save();
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