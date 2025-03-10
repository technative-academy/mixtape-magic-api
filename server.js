import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import routes from './src/routes.js';

dotenv.config();

const app = express();
const port = 3000;
const connectionString = process.env.XA_DB_CSTRING;

const { Client } = pg;
const client = new Client({
    connectionString,
});

const corsOptions = {
    origin: process.env.REACT_APP_DOMAIN,
    credentials: true,
};

app.get('/', async (req, res) => {
    //res.send('Hello world!');
    try {
        const results = await client.query('SELECT * FROM users');
        console.log(results.rows);
        res.json(results.rows);
    } catch {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(cors(corsOptions));
app.use('/api', routes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
