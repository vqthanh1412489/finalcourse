import { json } from 'body-parser';
import { Router } from 'express';
import { AdminService } from '../models/admin.service';
import { adminMiddleWare } from '../models/adminMiddleWare';
import { IMyRequest } from '../types';

export const adminRouter = Router();

adminRouter.use(json());

adminRouter.get('/', (req, res) => {
    console.log('Toi day roi');
    AdminService.getAllAdmin()
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Get Admin Fail' }));
});

adminRouter.post('/signup', (req, res) => {
    const { username, password, name, email, phone, address, birthDay } = req.body;
    AdminService.signUpAdmin(username, password, name, email, phone, address, birthDay)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Signup Fail' }));
});

adminRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;
    AdminService.signInAdmin(username, password)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Signin Fail' }));
});

adminRouter.post('/checkAdmin', (req, res) => {
    const { token } = req.headers;
    AdminService.checkUser(token as string)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});

adminRouter.delete('/:idAdminRemoved', adminMiddleWare, (req, res) => {
    const { idAdminRemoved } = req.params;
    AdminService.deleteAdmin(idAdminRemoved)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});

adminRouter.put('/changePassword', adminMiddleWare, (req: IMyRequest, res) => {
    const { newPassword } = req.body;
    AdminService.updatePasswordAdmin(req.id, newPassword)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});

adminRouter.put('/changeName', adminMiddleWare, (req: IMyRequest, res) => {
    const { newName } = req.body;
    AdminService.updateNameAdmin(req.id, newName)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
