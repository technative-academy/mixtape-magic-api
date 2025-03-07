import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const port = 3000;
const connectionString = process.env.XA_DB_CSTRING;

const { Client } = pg;
const client = new Client({
    connectionString
});


app.get('/', (req, res) => {
    res.send('Hello world!');
});


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

console.log("Starting connection");
await client.connect();
client.on('error', (err) => {
    console.error('An error has accured!', err.stack);
});

const results = await client.query('SELECT * FROM playlists');

console.log("results: ", results);

await client.end();

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
