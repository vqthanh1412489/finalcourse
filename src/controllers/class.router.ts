import { json } from 'body-parser';
import { Router } from 'express';
import { adminMiddleWare } from '../models/adminMiddleWare';
import { ClassService } from '../models/service/class.service';
import { IMyRequest } from '../types';

export const classRouter = Router();

classRouter.use(json());
classRouter.use(adminMiddleWare);

classRouter.post('/', (req, res) => {
    const { name, idCourse, idTeacher, idScheduleRoom, level } = req.body;
    ClassService.addClass(name, idCourse, idTeacher, idScheduleRoom, level)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Add Class Fail' }));
});

classRouter.delete('/:idClass', (req, res) => {
    const { idClass } = req.params;
    ClassService.deleteClass(idClass)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Delete Class Fail' }));
});

classRouter.put('/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { name, idCourse, idTeacher, idScheduleRoom, level } = req.body;
    ClassService.updateClass(idClass, name, idCourse, idTeacher, idScheduleRoom, level)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Update Class Fail' }));
});
classRouter.put('/addStudentToClass/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { idStudent } = req.body;
    ClassService.addStudentToClass(idClass, idStudent)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Add Student into Class Fail' }));
});