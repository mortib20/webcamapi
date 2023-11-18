import { Router } from "express";
import ImgEndpointsController from "./controller/ImgEndpointsController";

export default class ImgEndpoint {
    public router: Router;
    private controller: ImgEndpointsController = new ImgEndpointsController();

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('', this.controller.indexEndpoint);
        this.router.get('/:name', this.controller.nameEndpoint);
    }
}