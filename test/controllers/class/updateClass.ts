import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { AdminService } from '../../../src/models/admin.service';
import { Class } from '../../../src/models/Class';
import { Course } from '../../../src/models/Course';
import { Room } from '../../../src/models/Room';
import { ScheduleRoom } from '../../../src/models/ScheduleRoom';
import { ClassService } from '../../../src/models/service/class.service';
import { CourseService } from '../../../src/models/service/course.service';
import { RoomService } from '../../../src/models/service/room.service';
import { ScheduleRoomService } from '../../../src/models/service/scheduleRoom.service';
import { StudentService } from '../../../src/models/service/student.service';
import { Student } from '../../../src/models/Student';
import { TeacherService } from '../../../src/models/teacher.service';

describe('update Class Router', () => {
    let tk: any;
    let idCourse: any;
    let idTeacher: any;
    let idRoom: any;
    let idScheduleRoom: any;
    let idClass: any;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new Schedule - new Class', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        const teacher = await TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234',
        ['Toiec', 'Tofel'], '123');
        idTeacher = teacher._id;

        await CourseService.addCourse('ENGLISH', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = await Course.findOne({ name: 'ENGLISH' }) as Course;
        idCourse = course._id;

        await RoomService.addRoom('E102', 1000);
        const room = await Room.findOne({ name: 'E102' }) as Room;
        idRoom = room._id;

        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);

        await ScheduleRoomService.addScheduleRoom(4, startTime, endTime, idRoom);
        const schedule = await ScheduleRoom.findOne({ dayOfWeek: 4, idRoom }) as ScheduleRoom;
        idScheduleRoom = schedule._id;

        await ClassService.addClass('BBG234', idCourse, idTeacher, idScheduleRoom, 'Low');
        const cl = await Class.findOne({ name: 'BBG234' }) as Class;
        idClass = cl._id;
    });
    xit('KT can update Class incase idClass && you are Admin', async () => {
        const body = {
            name: 'RTT357',
            idCourse,
            idTeacher,
            idScheduleRoom,
            level: 'Advance'
        };
        const response = await request(app).put(`/class/${idClass}`)
        .send(body)
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
    it('KT cannot update Class incase idClass && you are not Admin', async () => {
        const body = {
            name: 'RTT357',
            idCourse,
            idTeacher,
            idScheduleRoom,
            level: 'Advance'
        };
        const response = await request(app).put(`/class/${idClass}`)
        .send(body)
        .set({ token: 'tkashfsf.ksahffk' });
        assert.equal(response.status, 404);
    });
});