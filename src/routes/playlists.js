const express = require('express');

const router = express.Router();

// // GET /api/playlists/
router.get('/', async (req, res) => {
    // return example JSON data - remove once database query is implemented
    const json = require('../../exampleData/playlists.json');
    res.status(200).json(json);
});

// GET /api/playlists/:playlistID
router.get('/api/playlists/:playlistID', (req, res) => {
    // access the playlistID from the URL by using req.params.playlistID
    const json = require('../../exampleData/playlistSingle.json');
    res.status(200).json(json);
});

module.exports = router;
