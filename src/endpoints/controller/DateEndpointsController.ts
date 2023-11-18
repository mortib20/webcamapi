import { Request, Response } from "express";
import WebcamFileSystem from "../../FileSystem";

export default class DateEndpointsController {
    public async indexEndpoint(req: Request, res: Response) {
        res.send({ endpoint: DateEndpointsController.name });
    }

    public async dateEndpoint(req: Request, res: Response) {
        const { year, month, day } = req.params;

        res.status(200).send(await WebcamFileSystem.GetFilesByDate(year, month, day));
    }
}