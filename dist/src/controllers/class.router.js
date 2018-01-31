"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const adminMiddleWare_1 = require("../models/adminMiddleWare");
const class_service_1 = require("../models/service/class.service");
exports.classRouter = express_1.Router();
exports.classRouter.use(body_parser_1.json());
exports.classRouter.use(adminMiddleWare_1.adminMiddleWare);
exports.classRouter.post('/', (req, res) => {
    const { name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek } = req.body;
    class_service_1.ClassService.addClass(name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Add Class Fail' }));
});
exports.classRouter.delete('/:idClass', (req, res) => {
    const { idClass } = req.params;
    class_service_1.ClassService.deleteClass(idClass)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete Class Fail' }));
});
exports.classRouter.put('/updateNameLevel/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { name, level } = req.body;
    class_service_1.ClassService.updateName_Level_Class(idClass, name, level)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Update Class Fail' }));
});
exports.classRouter.put('/addStudentToClass/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { idStudent } = req.body;
    class_service_1.ClassService.addStudentToClass(idClass, idStudent)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Add Student into Class Fail' }));
});
