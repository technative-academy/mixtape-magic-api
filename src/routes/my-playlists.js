import express from 'express';
import pool from '../db.js';
import authenticateToken from '../middlewere/auth.js';

const router = express.Router();

// Endpoints for playlists
// GET /api/my-playlists/
router.get('/', authenticateToken, async (req, res) => {
    // get all playlists for the logged in user
    try {
        const playlists = await pool.query('SELECT * FROM playlists WHERE owner_id = $1', [req.user.id]);
        const owner = await pool.query('SELECT id, username, image_url FROM users WHERE id = $1', [req.user.id]);
        const results = [];
        for (let i = 0; i < playlists.rows.length; i++) {
            const playlist = playlists.rows[i];
            const songs = await pool.query('SELECT * FROM songs WHERE playlist_id = $1', [playlist.id]);
            playlist.song_count = songs.rows.length;
            playlist.owner = owner.rows[0];
            results.push(playlist);
        }
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// GET /api/my-playlists/:playlistID
router.get('/:playlistID', authenticateToken, async (req, res) => {
    // access the playlistID from the URL by using req.params.playlistID
    try {
        const playlists = await pool.query('SELECT * FROM playlists WHERE owner_id = $1 AND id = $2', [req.user.id, req.params.playlistID]);
        if (playlists.rows.length === 0) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        const playlist = playlists.rows[0];
        const songs = await pool.query('SELECT * FROM songs WHERE playlist_id = $1', [req.params.playlistID]);
        playlist.song_count = songs.rows.length;
        playlist.songs = songs.rows;
        res.status(200).json(playlist);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// POST /api/my-playlists/
router.post('/', authenticateToken, async (req, res) => {
    // create a new playlist for the logged in user
    try {
        await pool.query('INSERT INTO playlists (name, owner_id, date_created, description, image_url) VALUES ($1, $2, NOW(), $3, $4);', [
            req.body.name,
            req.user.id,
            req.body.description,
            req.body.coverImage,
        ]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// PATCH /api/my-playlists/:playlistID
router.patch('/:playlistID', authenticateToken, async (req, res) => {
    // update the specified playlist
    try {
        if (typeof req.body.name != 'undefined') {
            await pool.query('UPDATE playlists SET name=$1 WHERE id=$2;', [req.body.name, req.params.playlistID]);
        }
        if (typeof req.body.description != 'undefined') {
            await pool.query('UPDATE playlists SET description=$1 WHERE id=$2;', [req.body.description, req.params.playlistID]);
        }
        if (typeof req.body.coverImage != 'undefined') {
            await pool.query('UPDATE playlists SET image_url=$1 WHERE id=$2;', [req.body.coverImage, req.params.playlistID]);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        sendStatus(500);
    }
});

// DELETE /api/my-playlists/:playlistID
router.delete('/:playlistID', authenticateToken, async (req, res) => {
    // delete the specified playlist
    try {
        await pool.query('DELETE FROM playlists WHERE id=$1;', [req.params.playlistID]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Endpoints for songs
// POST /api/my-playlists/:playlistID/songs/
router.post('/:playlistID/songs/', authenticateToken, async (req, res) => {
    // add a song to the specified playlist
    try {
        await pool.query('INSERT INTO songs (title, artist, song_url, playlist_id) VALUES ($1, $2, $3, $4);', [
            req.body.name,
            req.body.artist,
            req.body.file,
            req.params.playlistID,
        ]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// PATCH /api/my-playlists/:playlistID/songs/
router.patch('/:playlistID/songs/:songID', authenticateToken, async (req, res) => {
    // update the specified song
    try {
        if (typeof req.body.name != 'undefined') {
            await pool.query('UPDATE songs SET title=$1 WHERE id=$2;', [req.body.name, req.params.songID]);
        }
        if (typeof req.body.artist != 'undefined') {
            await pool.query('UPDATE songs SET artist=$1 WHERE id=$2;', [req.body.artist, req.params.songID]);
        }
        if (typeof req.body.file != 'undefined') {
            await pool.query('UPDATE songs SET song_url=$1 WHERE id=$2;', [req.body.file, req.params.songID]);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// DELETE /api/my-playlists/:playlistID/songs/
router.delete('/:playlistID/songs/:songID', authenticateToken, async (req, res) => {
    // delete the specified song
    try {
        await pool.query('DELETE FROM songs WHERE id=$1;', [req.params.songID]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

export default router;
