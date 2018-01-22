"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("../libs/jwt");
const Admin_1 = require("./Admin");
class AdminService {
    static signUpAdmin(username, password, name, email, phone, address, birthDay) {
        return __awaiter(this, void 0, void 0, function* () {
            const encrypted = yield bcrypt_1.hash(password, 8);
            const dateSignUp = new Date(Date.now());
            const admin = new Admin_1.Admin({
                username, password: encrypted, name, email, phone, address, birthDay, image: '', dateSignUp, authority: 0
            });
            yield admin.save();
            const adminInfor = admin.toObject();
            delete adminInfor.password;
            return adminInfor;
        });
    }
    static signInAdmin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield Admin_1.Admin.findOne({ username });
            if (!admin)
                throw new Error('User not exists');
            const same = yield bcrypt_1.compare(password, admin.password);
            if (!same)
                throw new Error('Password invalid');
            const adminInfor = admin.toObject();
            delete adminInfor.password;
            const token = yield jwt_1.createToken({ _id: admin._id, authority: admin.authority });
            return { admin: adminInfor, token };
        });
    }
    static checkUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, authority } = yield jwt_1.verifyToken(token);
            const admin = yield Admin_1.Admin.findById(_id);
            if (!admin)
                throw new Error('User not exists');
            if (admin.authority !== 0)
                throw new Error('You are not Admin');
            const adminInfor = admin.toObject();
            delete adminInfor.password;
            const newToken = yield jwt_1.createToken({ _id: admin._id, name: admin.name });
            return { admin: adminInfor, token: newToken };
        });
    }
}
exports.AdminService = AdminService;
