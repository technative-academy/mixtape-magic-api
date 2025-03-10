import express from 'express';
import playlistsJson from '../../exampleData/playlists.json';
import playlistsSingleJson from '../../exampleData/playlistSingle.json';

const router = express.Router();

// // GET /api/playlists/
router.get('/', async (req, res) => {
    // return example JSON data - remove once database query is implemented
    const json = playlistsJson;
    res.status(200).json(json);
});

// GET /api/playlists/:playlistID
router.get('/api/playlists/:playlistID', (req, res) => {
    // access the playlistID from the URL by using req.params.playlistID
    const json = playlistsSingleJson;
    res.status(200).json(json);
});

export default router;
