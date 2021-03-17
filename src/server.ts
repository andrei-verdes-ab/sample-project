import express from 'express';
import dotenv from 'dotenv';

import { StudentsDA } from './DA/index';
import { StudentsService } from './service/index';
import { StudentsRouter } from "./routes/index";

dotenv.config();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const studentsRouter = StudentsRouter(new StudentsService(new StudentsDA()));

router.get('/', (req, res) => {
    res.sendStatus(200);
})
router.use('/students', studentsRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`server running on ${process.env.APP_PORT}`);
})