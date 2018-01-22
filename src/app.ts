import * as cors from 'cors';
import * as express from 'express';
import { adminRouter } from './controllers/admin.router';

export const app = express();

app.use(cors());
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Vu Quoc Thanh');
});
