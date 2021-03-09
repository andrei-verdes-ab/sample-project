import express from 'express';
import dotenv from 'dotenv';

import { GradesDA, StudentsDA, PersonDA, SubjectsDA, TeachersDA } from './DA/index';
import { GradesService, StudentsService, PersonService, SubjectsService, TeachersService } from './service/index';
import { GradesRouter, StudentsRouter, PersonRouter, SubjectsRouter, TeachersRouter } from "./routes/index";

dotenv.config();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const studentsRouter = StudentsRouter(new StudentsService(new StudentsDA()));
const gradesRouter = GradesRouter(new GradesService(new GradesDA()));
const personRouter = PersonRouter(new PersonService(new PersonDA()));
const subjectsRouter = SubjectsRouter(new SubjectsService(new SubjectsDA()));
const teachersRouter = TeachersRouter(new TeachersService(new TeachersDA()));

router.use('/students', studentsRouter);
router.use('/grades', gradesRouter);
router.use('/person', personRouter);
router.use('/subjects', subjectsRouter);
router.use('/teachers', teachersRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`server running on ${process.env.APP_PORT}`);
})