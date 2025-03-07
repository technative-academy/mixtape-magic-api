const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

app.get('/api/playlists/', (req, res) => {
    // return example JSON data - remove once database query is implemented
    const json = require('./exampleData/playlists.json');
    res.status(200).send(json);
});
