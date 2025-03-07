const express = require('express');
const app = express();
const port = 3000;

const routes = require('./src/routes.js');

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
