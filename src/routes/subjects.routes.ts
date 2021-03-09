import express from 'express';
import { SubjectsService } from '../service';
import { Router, Response, Request } from 'express';

export const SubjectsRouter = (service: SubjectsService): Router => {
    let router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        try {
            const data = await service.GetSubjects();
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await service.GetSubject(parseInt(id));
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            await service.CreateSubject({ name, description });
            res.status(200).send('<h1>Subject added</h1>');
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    })

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            const id = parseInt(req.params.id);
            await service.UpdateSubject({ name, description, id });
            res.status(200).send('<h1>Subject updated</h1>');
        } catch (error) {
            res.status(500).send(error);
        }
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await service.DeleteSubject(parseInt(id));
            res.status(200).send('<h1>Subject deleted</h1>');
        }
        catch (err) {
            res.status(500).send(err);
        }
    })

    return router;
}