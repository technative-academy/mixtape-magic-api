import express from 'express';
import pool from '../db.js';
import usersJson from '../../exampleData/users.json' with { type: 'json' };

const router = express.Router();

// GET /api/users/
router.get('/', async (req, res) => {
    // get a list of all registered users
    try {
        const results = await pool.query('SELECT * FROM users');
        res.json(results.rows);
    } catch {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
