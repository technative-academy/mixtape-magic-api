import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/playlists/
router.get('/', async (req, res) => {
    // get a list of all playlists
    try {
        const playlists = await pool.query('SELECT * FROM playlists');
        const results = [];
        for (let i = 0; i < playlists.rows.length; i++) {
            const playlist = playlists.rows[i];
            const owner = await pool.query('SELECT id, username, image_url FROM users WHERE id = $1', [playlist.owner_id]);
            playlist.owner = owner.rows[0];
            const songs = await pool.query('SELECT * FROM songs WHERE playlist_id = $1', [playlist.id]);
            playlist.song_count = songs.rows.length;
            results.push(playlist);
        }
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// GET /api/playlists/:playlistID
router.get('/:playlistID', async (req, res) => {
    // get a specific playlist by ID
    try {
        const playlists = await pool.query('SELECT * FROM playlists WHERE id = $1', [req.params.playlistID]);
        if (playlists.rows.length === 0) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        const playlist = playlists.rows[0];
        const owner = await pool.query('SELECT id, username, image_url FROM users WHERE id = $1', [playlist.owner_id]);
        playlist.owner = owner.rows[0];
        const songs = await pool.query('SELECT * FROM songs WHERE playlist_id = $1', [req.params.playlistID]);
        playlist.song_count = songs.rows.length;
        playlist.songs = songs.rows;
        res.status(200).json(playlist);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

export default router;
