import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
const connectionString = process.env.XA_DB_CSTRING;

dotenv.config();

const pool = new Pool({
    connectionString,
});

export default pool;
