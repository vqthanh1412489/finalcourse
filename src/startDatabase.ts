import mongoose = require('mongoose');
import { connect } from 'mongoose';

mongoose.Promise = global.Promise;

function getDatabaseUri() {
    if (process.env.NODE_ENV === 'test') return 'mongodb://localhost/ttta-test';
    if (process.env.NODE_ENV === 'production') return 'mongodb://...';
    return 'mongodb://localhost/ttta';
}

connect(getDatabaseUri(), { useMongoClient: true })
.then(() => console.log('Connected'))
.catch(err => console.log(err));