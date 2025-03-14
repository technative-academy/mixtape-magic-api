import express from 'express';
import pool from '../db.js';
import playlistsJson from '../../exampleData/playlists.json' with { type: 'json' };
import playlistsSingleJson from '../../exampleData/playlistSingle.json' with { type: 'json' };

const router = express.Router();

// GET /api/playlists/
router.get('/', async (req, res) => {
    // return example JSON data - remove once database query is implemented
    // const json = playlistsJson;
    // res.status(200).json(json);

    try {
        const results = await pool.query('SELECT * FROM playlists');
        res.json(results.rows);
    } catch (error) {
        res.sendStatus(500);
    }
});

// GET /api/playlists/:playlistID
router.get('/:playlistID', async (req, res) => {
    // access the playlistID from the URL by using req.params.playlistID
    // const json = playlistsSingleJson;
    // res.status(200).json(json);

    // construct parameterized query
    const query = 'SELECT * FROM playlists WHERE id = ?';
    try {
        const results = await pool.query(query, [req.params.playlistID]);
        res.json(results.rows[0]);
    } catch {
        res.sendStatus(500);
    }
});

export default router;
