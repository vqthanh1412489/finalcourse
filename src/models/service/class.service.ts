import { Class } from '../Class';
import { Course } from '../Course';
import { Room } from '../Room';
import { ScheduleRoom } from '../ScheduleRoom';
import { ScheduleTeacher } from '../ScheduleTeacher';
import { Student } from '../Student';
import { Teacher } from '../Teacher';
import { CourseService } from './course.service';
import { ScheduleRoomService } from './scheduleRoom.service';
import { ScheduleTeacherService } from './scheduleTeacher.service';
import { StudentService } from './student.service';

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
            if (element.dayOfWeek === dayOfWeek &&
                checkOverlapDate(new Date(startTime), new Date(endTime), new Date(element.startTime), new Date(element.endTime)))
                throw new Error('Teacher busy');
        });
        scheduleRooms.forEach(element => {
            if (element.dayOfWeek === dayOfWeek &&
                checkOverlapDate(new Date(startTime), new Date(endTime), new Date(element.startTime), new Date(element.endTime)))
                throw new Error('Room busy');
        });
        const cl = new Class({ name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek });
        await cl.save();
        await ScheduleTeacherService.addScheduleTeacher(idTeacher, startTime, endTime, dayOfWeek);
        await ScheduleRoomService.addScheduleRoom(dayOfWeek, startTime, endTime, idRoom);
        const classInfor = await Class.findOne({ name }) as Class;
        await CourseService.addClassToCourse(idCourse, classInfor._id);
        return cl;
    }

    static async deleteClass(idClass: string) {
        const classRemoved = await Class.findByIdAndRemove(idClass) as Class;
        if (!classRemoved) throw new Error('idClass not found');
        await ScheduleTeacher.remove({
            idTeacher: classRemoved.idTeacher,
            startTime: classRemoved.startTime,
            endTime: classRemoved.endTime
        });
        await ScheduleRoom.remove({
            idRoom: classRemoved.idRoom,
            startTime: classRemoved.startTime,
            endTime: classRemoved.endTime
        });
        await Course.findByIdAndUpdate(classRemoved.idCourse, {
            $pull: {
                listClass: idClass
            }
        });
        const students = classRemoved.students;
        students.forEach(async (idStudent) => {
            const student = await Student.findById(idStudent) as Student;
            const listClass = student.listClass;
            listClass.forEach(element => {
                if (element.toString() === idClass) {
                    StudentService.removeClassToStudent(student._id, idClass);
                }
            });
        });
        return classRemoved;
    }

    static async updateName_Level_Class(
        idClass: string,
        newName: string,
        newLevel: string,
    ) {
        const newClass = await Class.findByIdAndUpdate(idClass,
            {
                name: newName,
                level: newLevel,
            }, { new: true }) as Class;
        if (!newClass) throw new Error('idClass not found');
        return newClass;
    }

    static async updateRoom_Class(idClass: string, idNewRoom: string) {
        const newClass = await Class.findByIdAndUpdate(idClass,
            {
                idRoom: idNewRoom
            }, { new: true }) as Class;
        const oldClass = await Class.findById(idClass) as Class;
        await ScheduleRoomService.updateScheduleRoom()
    }

    static async addStudentToClass(idClass: string, idStudent: string) {
        const newClass = await Class.findByIdAndUpdate(idClass, {
            $addToSet: {
                students: idStudent
            }
        }, { new: true }) as Class;
        if (!newClass) throw new Error('idClass not found');
        StudentService.addClassToStudent(idStudent, idClass);
        return newClass;
    }
}