"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../src/reader");
class Routes {
    constructor() {
        this.timezoneController = new reader_1.TimezoneController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!'
            });
        });
        app.route('/all')
            .get((req, res) => {
            res.json(this.timezoneController.readAll());
        });
        app.route('/timezone/:id')
            .get((req, res) => {
            res.json(this.timezoneController.getId(req.params.id));
        });
        app.route('/distances')
            .get((req, res) => {
            res.json(this.timezoneController.calculateDistance());
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map