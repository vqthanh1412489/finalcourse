import * as cors from 'cors';
import * as express from 'express';
import { adminRouter } from './controllers/admin.router';
import { classRouter } from './controllers/class.router';
import { courseRouter } from './controllers/course.router';
import { roomRouter } from './controllers/room.router';
import { scheduleRoomRouter } from './controllers/scheduleRoom.router';
import { scheduleTeacherRouter } from './controllers/scheduleTeacher.router';
import { studentRouter } from './controllers/student.router';
import { teacherRouter } from './controllers/teacher.router';

export const app = express();

app.use(cors());
app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/room', roomRouter);
app.use('/scheduleRoom', scheduleRoomRouter);
app.use('/student', studentRouter);
app.use('/course', courseRouter);
app.use('/class', classRouter);
app.use('/scheduleTeacher', scheduleTeacherRouter);

app.get('/', (req, res) => {
    res.send('Vu Quoc Thanh');
});
