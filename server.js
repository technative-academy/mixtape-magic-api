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


const routes = require('./src/routes.js');

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
