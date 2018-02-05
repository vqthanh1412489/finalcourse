"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
mongoose.Promise = global.Promise;
function getDB() {
    if (process.env.NODE_ENV === 'test')
        return 'mongodb://localhost/ttta-test';
    if (process.env.NODE_ENV === 'production')
        return 'mongodb://localhost/ttta';
    return 'mongodb://localhost/ttta';
}
mongoose_1.connect(getDB())
    .then(() => {
    console.log('Connected');
})
    .catch(err => console.log(err));
