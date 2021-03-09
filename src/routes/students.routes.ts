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

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await service.GetStudent(parseInt(id));
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

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { name, email, age } = req.body;
            const id = parseInt(req.params.id);
            await service.UpdateStudent({ name, email, age, id});
            res.status(200).send('<h1>Student updated</h1>');
        } catch (error) {
            res.status(500).send(error);
        }
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await service.DeleteStudent(id);
            res.status(200).send('<h1>Student deleted</h1>');
        }
        catch (err) {
            res.status(500).send(err);
        }
    })

    return router;
}