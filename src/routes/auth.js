import express from 'express';
import { registerUser, loginUser, refreshAccessToken } from '../services/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        const user = await registerUser(name, email, password, bio);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { id, name, accessToken, refreshToken } = await loginUser(email, password);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // d * h * m * s * ms
        });

        res.json({ id, name, accessToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    try {
        const newAccessToken = await refreshAccessToken(refreshToken);

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
});

router.post('logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out' });
});

export default router;
