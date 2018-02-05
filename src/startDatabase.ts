import mongoose = require('mongoose');
import { connect } from 'mongoose';
mongoose.Promise = global.Promise;

function getDB() {
    if (process.env.NODE_ENV === 'test') return 'mongodb://localhost/ttta-test';
    if (process.env.NODE_ENV === 'production') return 'mongodb://localhost/ttta';
    return 'mongodb://localhost/ttta';
}

connect(getDB())
    .then(() => {
        console.log('Connected');
    })
    .catch(err => console.log(err));