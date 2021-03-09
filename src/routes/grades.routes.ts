import express from 'express';
import { GradesService } from '../service';
import { Router, Response, Request } from 'express';

export const GradesRouter = (service: GradesService): Router => {
    let router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        try {
            const data = await service.GetGrades();
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    router.get('/student/:id/', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await service.GetGradeByStudentId(parseInt(id));
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    router.get('/student/:id/info/', async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const sort = req.query.sort as string;
            const order = req.query.order as string;
            const data = await service.GetGradesAndStudentInfo(id, sort, order);
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { subject, comment, grade, student } = req.body;
            await service.AddStudentGrade({ subject, comment, grade, student });
            res.status(200).send('<h1>Grade added</h1>');
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    })

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { subject, comment, grade, student } = req.body;
            const id = parseInt(req.params.id);
            await service.UpdateStudentGrade({ subject, comment, grade, student, id });
            res.status(200).send('<h1>Grade updated</h1>');
        } catch (error) {
            res.status(500).send(error);
        }
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await service.DeleteGrade(parseInt(id));
            res.status(200).send('<h1>Grade deleted</h1>');
        }
        catch (err) {
            res.status(500).send(err);
        }
    })

    return router;
}