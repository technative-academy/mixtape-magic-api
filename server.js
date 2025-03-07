const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

// GET /api/playlists/
app.get('/api/playlists/', (req, res) => {
    // return example JSON data - remove once database query is implemented
    const json = require('./exampleData/playlists.json');
    res.status(200).send(json);
});

// GET /api/playlists/:playlistID
app.get('/api/playlists/:playlistID', (req, res) => {
    // access the playlistID from the URL by using req.params.playlistID
    const json = require('./exampleData/playlistSingle.json');
    res.status(200).send(json);
});
