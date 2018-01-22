import mongoose = require('mongoose');
import { connect } from 'mongoose';
mongoose.Promise = global.Promise;
let url;

if (process.env.NODE_ENV === 'test')  url = 'mongodb://localhost/ttta-test';
else if (process.env.NODE_ENV === 'production')  url = 'mongodb://....';
else url = 'mongodb://localhost/ttta';

connect(url)
    // .then(() => console.log('Connected'))
    .catch(err => console.log(err));