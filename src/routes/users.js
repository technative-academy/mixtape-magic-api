import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/users/
router.get('/', async (req, res) => {
    // get a list of all registered users
    try {
        const results = await pool.query('SELECT * FROM users');
        res.json(results.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
