import { Request, Response } from "express";
import { TimezoneController } from "../src/reader";


export class Routes {
    public timezoneController: TimezoneController = new TimezoneController();
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!'
                })
            })
        app.route('/all')
            .get((req: Request, res: Response) => {
                res.json(this.timezoneController.readAll());
            })
        app.route('/timezone/:id')
            .get((req: Request, res: Response) => {
                res.json(this.timezoneController.getId(req.params.id));
            })
    }
}