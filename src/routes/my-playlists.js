import express from 'express';
import myPlaylistsJson from '../../exampleData/myplaylists.json' assert { type: 'json' };
import myPlaylistsSingleJson from '../../exampleData/myplaylistsSingle.json' assert { type: 'json' };

const router = express.Router();

// Endpoints for playlists
// GET /api/my-playlists/
router.get('/', async (req, res) => {
    // return example JSON data - remove once database query is implemented
    res.status(200).json(myPlaylistsJson);
});

// GET /api/my-playlists/:playlistID
router.get('/:playlistID', (req, res) => {
    // access the playlistID from the URL by using req.params.playlistID
    res.status(200).json(myPlaylistsSingleJson);
});

// POST /api/my-playlists/
router.post('/', (req, res) => {
    // create a new playlist for the logged in user
    res.status(201);
});

// PATCH /api/my-playlists/:playlistID
router.patch('/:playlistID', (req, res) => {
    // update the specified playlist
    res.status(200);
});

// DELETE /api/my-playlists/:playlistID
router.delete('/:playlistID', (req, res) => {
    // delete the specified playlist
    res.status(204);
});

// Endpoints for songs
// POST /api/my-playlists/:playlistID/songs/
router.post('/:playlistID/songs/', (req, res) => {
    // add a song to the specified playlist
    res.status(201);
});

// PATCH /api/my-playlists/:playlistID/songs/
router.patch('/:playlistID/songs/:songID', (req, res) => {
    // update the specified song
    res.status(200);
});

// DELETE /api/my-playlists/:playlistID/songs/
router.delete('/:playlistID/songs/:songID', (req, res) => {
    // delete the specified song
    res.status(204);
});

export default router;
