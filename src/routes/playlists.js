import express from 'express';
import pool from '../db.js';
import playlistsJson from '../../exampleData/playlists.json' with { type: 'json' };
import playlistsSingleJson from '../../exampleData/playlistSingle.json' with { type: 'json' };

const router = express.Router();

// GET /api/playlists/
router.get('/', async (req, res) => {
    // get a list of all playlists
    try {
        const results = await pool.query('SELECT * FROM playlists');
        res.json(results.rows);
    } catch (error) {
        res.sendStatus(500);
    }
});

// GET /api/playlists/:playlistID
router.get('/:playlistID', async (req, res) => {
    // get a specific playlist by ID
    try {
        const results = await pool.query('SELECT * FROM playlists WHERE id = $1', [req.params.playlistID]);
        res.json(results.rows[0]);
    } catch {
        res.sendStatus(500);
    }
});

export default router;
