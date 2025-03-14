import express from 'express';
import pool from '../db.js';

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
        const playlist = await pool.query('SELECT * FROM playlists WHERE id = $1', [req.params.playlistID]).rows[0];
        playlist.songs = await pool.query('SELECT * FROM songs WHERE playlist_id = $1', [req.params.playlistID]).rows;
        res.json(playlist);
    } catch {
        res.sendStatus(500);
    }
});

export default router;
