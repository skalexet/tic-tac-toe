const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
    console.log(req.originalUrl);
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => { console.log('Server is running. localhost:3000...'); });
