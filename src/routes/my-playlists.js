import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Endpoints for playlists
// GET /api/my-playlists/
router.get('/', async (req, res) => {
    // get all playlists for the logged in user
    try {
        const results = await pool.query('SELECT * FROM playlists WHERE owner_id = $1', [req.user.id]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.sendStatus(500);
    }
});

// GET /api/my-playlists/:playlistID
router.get('/:playlistID', async (req, res) => {
    // access the playlistID from the URL by using req.params.playlistID
    try {
        const playlist = await pool.query('SELECT * FROM playlists WHERE owner_id = $1 AND id = $2', [req.user.id, req.params.playlistID]).rows[0];
        playlist.songs = await pool.query('SELECT * FROM songs WHERE playlist_id = $1', [req.params.playlistID]).rows;
        res.status(200).json(playlist);
    } catch (error) {
        res.sendStatus(500);
    }
});

// POST /api/my-playlists/
router.post('/', async (req, res) => {
    // create a new playlist for the logged in user
    try {
        await pool.query('INSERT INTO playlists (name, owner_id, date_created, description, image_url) VALUES ($1, $2, $3, $4, $5);', [
            req.body.name,
            req.user.id,
            req.body.createdDate,
            req.body.description,
            req.body.coverImage,
        ]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
});

// PATCH /api/my-playlists/:playlistID
router.patch('/:playlistID', async (req, res) => {
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
        sendStatus(500);
    }
});

// DELETE /api/my-playlists/:playlistID
router.delete('/:playlistID', async (req, res) => {
    // delete the specified playlist
    try {
        await pool.query('DELETE FROM playlists WHERE id=$1;', [req.params.playlistID]);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Endpoints for songs
// POST /api/my-playlists/:playlistID/songs/
router.post('/:playlistID/songs/', async (req, res) => {
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
        res.sendStatus(500);
    }
});

// PATCH /api/my-playlists/:playlistID/songs/
router.patch('/:playlistID/songs/:songID', async (req, res) => {
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
        res.sendStatus(500);
    }
});

// DELETE /api/my-playlists/:playlistID/songs/
router.delete('/:playlistID/songs/:songID', async (req, res) => {
    // delete the specified song
    try {
        await pool.query('DELETE FROM songs WHERE id=$1;', [req.params.songID]);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
});

export default router;
