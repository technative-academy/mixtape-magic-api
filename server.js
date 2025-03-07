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