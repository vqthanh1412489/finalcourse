"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
mongoose.Promise = global.Promise;
let url;
if (process.env.NODE_ENV === 'test')
    url = 'mongodb://localhost/ttta-test';
else if (process.env.NODE_ENV === 'production')
    url = 'mongodb://....';
else
    url = 'mongodb://localhost/ttta';
mongoose_1.connect(url)
    .catch(err => console.log(err));
