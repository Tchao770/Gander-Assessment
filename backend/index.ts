import express, { Express, Request, Response } from 'express';

export const app: Express = express();
app.use(express.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/add', (req: Request, res: Response) => {
    const ans = parseInt(req.body.a) + parseInt(req.body.b)
    res.send(String(ans));
});

app.listen(8000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:8000`);
});