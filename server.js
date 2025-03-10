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

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use(cors(corsOptions));
app.use('/api', routes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
