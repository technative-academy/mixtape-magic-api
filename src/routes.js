const express = require('express');

playlistsRoutes = require('./routes/playlists.js');

const router = express.Router();

router.use('/playlists', playlistsRoutes);

module.exports = router;
