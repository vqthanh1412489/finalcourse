import { Admin } from '../../src/models/Admin';
import { AdminService } from '../../src/models/admin.service';

describe('Add Admin models', () => {
    it('KT can SignUp new Admin incase full infor', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const admin = await Admin.findOne({ username: 'vqt1' }) as Admin;
        console.log(admin);
    });
});