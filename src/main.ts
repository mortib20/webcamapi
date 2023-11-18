//@ts-check
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import DateEndpoint from './endpoints/DateEndpoints';
import ImgEndpoint from './endpoints/ImgEndpoints';


const imagePath = 'Z:\\webcam'

const app = express();

app.listen(3277, () => console.log("Server listening on port 3277"));

app.use(cors());
app.use(morgan('tiny'));
app.use('/date', new DateEndpoint().router)
app.use('/img', new ImgEndpoint().router)

app.get('/', async (req: Request, res: Response) => {
    res.send('hello world');
    res.end();
})