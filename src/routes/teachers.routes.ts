import express from 'express';
import { TeachersService } from '../service';
import { Router, Response, Request } from 'express';

export const TeachersRouter = (service: TeachersService): Router => {
    let router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        try {
            const data = await service.GetTeachers();
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await service.GetTeacher(parseInt(id));
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { firstname, lastname, subject, subject_optional } = req.body;
            await service.CreateTeacher({ firstname, lastname, subject, subject_optional });
            res.status(200).send('<h1>Teacher added</h1>');
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    })

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { firstname, lastname, subject, subject_optional } = req.body;
            const id = parseInt(req.params.id);
            await service.UpdateTeacher({ firstname, lastname, subject, subject_optional, id });
            res.status(200).send('<h1>Teacher updated</h1>');
        } catch (error) {
            res.status(500).send(error);
        }
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await service.DeleteTeacher(parseInt(id));
            res.status(200).send('<h1>Teacher deleted</h1>');
        }
        catch (err) {
            res.status(500).send(err);
        }
    })

    return router;
}