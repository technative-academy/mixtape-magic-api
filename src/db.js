import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.XA_DB_CSTRING;
const port = process.env.PORT;

const pool = new Pool({
    connectionString,
    port,
});

export default pool;
