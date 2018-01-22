import { json } from 'body-parser';
import { Router } from 'express';
import { AdminService } from '../models/admin.service';

export const adminRouter = Router();

adminRouter.use(json());

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
    .catch(err => res.status(404).send({ success: false, message: 'Username of Password invalid' }));
});

adminRouter.post('/checkAdmin', (req, res) => {
    const { username, password } = req.body;
    AdminService.signInAdmin(username, password)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
