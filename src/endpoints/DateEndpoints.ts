import { Router } from "express";
import DateEndpointsController from "./controller/DateEndpointsController";

export default class DateEndpoint {
    public router: Router;
    private controller: DateEndpointsController = new DateEndpointsController();

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('', this.controller.indexEndpoint);
        this.router.get('/:year-:month-:day', this.controller.dateEndpoint);
    }
}