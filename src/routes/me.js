import express from 'express';
import pool from '../db.js';
import authenticateToken from '../middlewere/auth.js';

const router = express.Router();

// Get /api/me/
router.get('/me', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/', async, (req, res) => {});

router.delete('/', async (req, res) => {});

export default router;
