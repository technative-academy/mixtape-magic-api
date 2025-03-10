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

export default router;
