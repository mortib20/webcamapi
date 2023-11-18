import { Request, Response } from "express";
import WebcamFileSystem from "../../FileSystem";

export default class ImgEndpointsController {
    public async indexEndpoint(req: Request, res: Response) {
        res.send({ endpoint: ImgEndpointsController.name });
    }

    public async nameEndpoint(req: Request, res: Response) {
        const { name } = req.params;

        res.status(200).type('image/webp').send(await WebcamFileSystem.GetFileByName(name));
    }
}