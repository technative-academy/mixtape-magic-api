import express from 'express';

import usersRoutes from './routes/users.js';
import playlistsRoutes from './routes/playlists.js';
import myPlaylistsRoutes from './routes/my-playlists.js';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/playlists', playlistsRoutes);
router.use('/my-playlists', myPlaylistsRoutes);

export default router;
