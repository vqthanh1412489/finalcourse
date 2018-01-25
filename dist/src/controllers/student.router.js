"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const adminMiddleWare_1 = require("../models/adminMiddleWare");
const student_service_1 = require("../models/service/student.service");
const studentMiddleWate_1 = require("../models/studentMiddleWate");
exports.studentRouter = express_1.Router();
exports.studentRouter.use(body_parser_1.json());
exports.studentRouter.post('/signup', adminMiddleWare_1.adminMiddleWare, (req, res) => {
    const { username, password, name, email, address, phone, score, level } = req.body;
    student_service_1.StudentService.signUpStudent(username, password, name, email, address, phone, score, level)
        .then(student => res.send({ success: true, student }))
        .catch(err => res.status(404).send({ success: false, message: 'Signup Fail' }));
});
exports.studentRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;
    student_service_1.StudentService.signInStudent(username, password)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Sign in Fail' }));
});
exports.studentRouter.post('/checkStudent', studentMiddleWate_1.studentMiddleWare, (req, res) => {
    const { token } = req.headers;
    student_service_1.StudentService.checkStudent(token)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
exports.studentRouter.delete('/:idStudent', adminMiddleWare_1.adminMiddleWare, (req, res) => {
    const { idStudent } = req.params;
    student_service_1.StudentService.deteleStudent(idStudent)
        .then(student => res.send({ success: true, student }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete Student Fail' }));
});
exports.studentRouter.put('/changePassword', studentMiddleWate_1.studentMiddleWare, (req, res) => {
    const { newPassword } = req.body;
    student_service_1.StudentService.updatePasswordStudent(req.id, newPassword)
        .then(student => res.send({ success: true, student }))
        .catch(err => res.status(404).send({ success: false, message: 'Change Password Student Fail' }));
});
