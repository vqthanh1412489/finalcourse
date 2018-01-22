"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const admin_router_1 = require("./controllers/admin.router");
exports.app = express();
exports.app.use(cors());
exports.app.use('/admin', admin_router_1.adminRouter);
exports.app.get('/', (req, res) => {
    res.send('Vu Quoc Thanh');
});
