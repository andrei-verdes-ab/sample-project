import express from 'express';
import { StudentsService } from '../service';
import { Router, Response, Request } from 'express';

export const StudentsRouter = (service: StudentsService): Router => {
    let router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        try {
            const data = await service.GetStudents();
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { name, email, age } = req.body;
            await service.CreateStudent({ name, email, age });
            res.status(200).send('<h1>Student added</h1>');
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    })

    return router;
}