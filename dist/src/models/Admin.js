"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    birthDay: { type: Date, required: true, trim: true },
    image: { type: String, trim: true },
    dateSignUp: { type: Date, required: true, trim: true },
    authority: { type: Number, required: true } // 0: Admin - 1: Teacher - 2: Student
});
const AdminMongo = mongoose_1.model('Admin', AdminSchema);
class Admin extends AdminMongo {
}
exports.Admin = Admin;
