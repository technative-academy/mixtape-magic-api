import express from 'express';

import playlistsRoutes from './routes/playlists.js';
import usersRoutes from './routes/users.js';

const router = express.Router();

router.use('/playlists', playlistsRoutes);
router.use('/users', usersRoutes);

export default router;
