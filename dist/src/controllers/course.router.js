"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const adminMiddleWare_1 = require("../models/adminMiddleWare");
const course_service_1 = require("../models/service/course.service");
exports.courseRouter = express_1.Router();
exports.courseRouter.use(body_parser_1.json());
exports.courseRouter.use(adminMiddleWare_1.adminMiddleWare);
exports.courseRouter.post('/', (req, res) => {
    const { name, numberSession, startDate, endDate, tuition, detailInfor } = req.body;
    course_service_1.CourseService.addCourse(name, numberSession, startDate, endDate, tuition, detailInfor)
        .then(course => res.send({ success: true, course }))
        .catch(err => res.status(404).send({ success: false, message: 'Add Course Fail' }));
});
exports.courseRouter.delete('/:idCourse', (req, res) => {
    const { idCourse } = req.params;
    course_service_1.CourseService.deleteCourse(idCourse)
        .then(course => res.send({ success: true, course }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete Course Fail' }));
});
exports.courseRouter.put('/:idCourse', (req, res) => {
    const { idCourse } = req.params;
    const { name, numberSession, startDate, endDate, tuition, detailInfor } = req.body;
    course_service_1.CourseService.updateCourse(idCourse, name, numberSession, startDate, endDate, tuition, detailInfor)
        .then(course => res.send({ success: true, course }))
        .catch(err => res.status(404).send({ success: false, message: 'Update Course Fail' }));
});
exports.courseRouter.put('/addClassToCourse/:idCourse', (req, res) => {
    const { idCourse } = req.params;
    const { idClass } = req.body;
    course_service_1.CourseService.addClassToCourse(idCourse, idClass)
        .then(course => res.send({ success: true, course }))
        .catch(err => res.status(404).send({ success: false, message: 'Add Class into Course Fail' }));
});
