"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!'
            });
        });
        app.route('/all')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!'
            });
        });
        app.route('/timezone/:id')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!'
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map