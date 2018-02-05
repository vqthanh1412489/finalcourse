"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const admin_service_1 = require("../models/admin.service");
const adminMiddleWare_1 = require("../models/adminMiddleWare");
exports.adminRouter = express_1.Router();
exports.adminRouter.use(body_parser_1.json());
exports.adminRouter.get('/', (req, res) => {
    console.log('Toi day roi');
    admin_service_1.AdminService.getAllAdmin()
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Get Admin Fail' }));
});
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
        .catch(err => res.status(404).send({ success: false, message: 'Signin Fail' }));
});
exports.adminRouter.post('/checkAdmin', (req, res) => {
    const { token } = req.headers;
    admin_service_1.AdminService.checkUser(token)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
exports.adminRouter.delete('/:idAdminRemoved', adminMiddleWare_1.adminMiddleWare, (req, res) => {
    const { idAdminRemoved } = req.params;
    admin_service_1.AdminService.deleteAdmin(idAdminRemoved)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
exports.adminRouter.put('/changePassword', adminMiddleWare_1.adminMiddleWare, (req, res) => {
    const { newPassword } = req.body;
    admin_service_1.AdminService.updatePasswordAdmin(req.id, newPassword)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
exports.adminRouter.put('/changeName', adminMiddleWare_1.adminMiddleWare, (req, res) => {
    const { newName } = req.body;
    admin_service_1.AdminService.updateNameAdmin(req.id, newName)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
