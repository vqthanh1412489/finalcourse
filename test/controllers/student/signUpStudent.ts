import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { AdminService } from '../../../src/models/admin.service';
import { Student } from '../../../src/models/Student';

describe('Student signup Router', () => {
    let tk: any;
    beforeEach('Add a new Admin', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    });
    xit('KT can signup new Student incase full infor && is Admin', async () => {
        const body = { username: 'student1', password: '123',
            name: 'Student 1',
            email: 'student1@gmail.com', address: '227 NVC', phone: '01699716055',
            score: 0, level: 0 };
        const res = await request(app).post('/student/signup')
        .send(body)
        .set({ token: tk });

        assert.equal(res.status, 200);
    });
    xit('KT cannot signup new Student incase full infor && is not Admin', async () => {
        const body = { username: 'student1', password: '123',
            name: 'Student 1',
            email: 'student1@gmail.com', address: '227 NVC', phone: '01699716055',
            score: 0, level: 0 };
        const res = await request(app).post('/student/signup')
        .send(body)
        .set({ token: 'tk.khasdf.jusfla' });

        assert.equal(res.status, 404);
    });
    it('KT cannot signup new Student incase empty username && is Admin', async () => {
        const body = { password: '123',
            name: 'Student 1',
            email: 'student1@gmail.com', address: '227 NVC', phone: '01699716055',
            score: 0, level: 0 };
        const res = await request(app).post('/student/signup')
        .send(body)
        .set({ token: tk });

        assert.equal(res.status, 404);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Signup Fail');
    });
});