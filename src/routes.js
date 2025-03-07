const express = require('express');

playlistsRoutes = require('./routes/playlists.js');
usersRoutes = require('./routes/users.js');

const router = express.Router();

router.use('/playlists', playlistsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
