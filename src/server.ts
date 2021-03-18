import express from 'express';
import dotenv from 'dotenv';

import { DBManager } from "./DA/DBManager";
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

//quick hack
const query = "CREATE TABLE `students` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(50) NOT NULL,`email` varchar(100) NOT NULL,`age` int(5) NOT NULL,PRIMARY KEY (`id`))";
try {
    new DBManager().InsertOrUpdateData(query, []);
} catch (err) {
    throw err;
}