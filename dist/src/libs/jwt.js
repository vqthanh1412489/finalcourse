"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const KEY = 'Thanh123';
function createToken(obj) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.sign(obj, KEY, { expiresIn: '2 days' }, (err, token) => {
            if (err)
                return reject(err);
            resolve(token);
        });
    });
}
exports.createToken = createToken;
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.verify(token, KEY, (err, obj) => {
            if (err)
                return reject(err);
            resolve(obj);
        });
    });
}
exports.verifyToken = verifyToken;
