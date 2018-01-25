"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../libs/jwt");
exports.studentMiddleWare = (req, res, next) => {
    const { token } = req.headers;
    if (!token)
        return res.status(404).send({ success: false, message: 'Token invalid' });
    jwt_1.verifyToken(token)
        .then(obj => {
        if (obj.authority === 2) {
            req.id = obj._id;
            next();
        }
    })
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
};
