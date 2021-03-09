import express from 'express';
import { PersonService } from '../service';
import { Router, Response, Request } from 'express';

export const PersonRouter = (service: PersonService): Router => {
    let router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const data = service.getData();
            res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ "err": err });
        }
    })

    return router;
}