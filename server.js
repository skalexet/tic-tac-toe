import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

const DIRNAME = process.cwd();
const STATIC_PATH = express.static(path.join(DIRNAME, '/'));
app.use(STATIC_PATH);

app.get('/', (req, res) => {
    console.log(req.originalUrl);
    res.sendFile(DIRNAME + '/index.html');
});

app.listen(port, () => { console.log('Server is running. localhost:3000...'); });
