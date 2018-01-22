"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const teacher_service_1 = require("../models/teacher.service");
exports.teacherRouter = express_1.Router();
exports.teacherRouter.use(body_parser_1.json());
exports.teacherRouter.post('/signup', (req, res) => {
    const { username, password, name, email, phone, nationality, address, bank, bankAccountNumber, skill, note } = req.body;
    teacher_service_1.TeacherService.signUpTeacher(username, password, name, email, phone, nationality, address, bank, bankAccountNumber, skill, note)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Signup Fail' }));
});
exports.teacherRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;
    teacher_service_1.TeacherService.signInTeacher(username, password)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Username of Password invalid' }));
});
exports.teacherRouter.post('/checkteacher', (req, res) => {
    const { token } = req.headers;
    teacher_service_1.TeacherService.checkTeacher(token)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
