import express from 'express';

const router = express.Router();

// GET /api/my-playlists/
router.get('/', async (req, res) => {
    // return example JSON data - remove once database query is implemented
    const json = require('../../exampleData/myplaylists.json');
    res.status(200).json(json);
});

// GET /api/my-playlists/:playlistID
router.get('/api/my-playlists/:playlistID', (req, res) => {
    // access the playlistID from the URL by using req.params.playlistID
    const json = require('../../exampleData/myplaylistsSingle.json');
    res.status(200).json(json);
});

// POST /api/my-playlists/
router.post('/', (req, res) => {
    // create a new playlist for the logged in user
    res.status(201);
});

// PATCH /api/my-playlists/:playlistID
router.patch('/api/my-playlists/:playlistID', (req, res) => {
    // update the specified playlist
    res.status(200);
});

// DELETE /api/my-playlists/:playlistID
router.delete('/api/my-playlists/:playlistID', (req, res) => {
    // delete the specified playlist
    res.status(204);
});

export default router;
