"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const admin_service_1 = require("../models/admin.service");
exports.adminRouter = express_1.Router();
exports.adminRouter.use(body_parser_1.json());
exports.adminRouter.post('/signup', (req, res) => {
    const { username, password, name, email, phone, address, birthDay } = req.body;
    admin_service_1.AdminService.signUpAdmin(username, password, name, email, phone, address, birthDay)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Signup Fail' }));
});
exports.adminRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;
    admin_service_1.AdminService.signInAdmin(username, password)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Username of Password invalid' }));
});
exports.adminRouter.post('/checkAdmin', (req, res) => {
    const { token } = req.headers;
    admin_service_1.AdminService.checkUser(token)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
