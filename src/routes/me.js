import express from 'express';
import pool from '../db.js';
import authenticateToken from '../middlewere/auth.js';

const router = express.Router();

// Get /api/me/
router.get('/', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id, username, image_url FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { newUsername, newEmail, newPassword, newImageURL } = req.body;

    try {
        const result = await pool.query('SELECT id, username, image_url FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (typeof newUsername != 'undefined') {
            await pool.query('UPDATE users SET username = $1 WHERE id = $2', [newUsername, id]);
        }

        if (typeof newEmail != 'undefined') {
            await pool.query('UPDATE users SET email = $1 WHERE id = $2', [newEmail, id]);
        }

        if (typeof newPassword != 'undefined') {
            // If the email does not exist, proceed with registration
            // hash the password and insert the new user into the database
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);
        }

        if (typeof newImageURL != 'undefined') {
            await pool.query('UPDATE users SET imageURL = $1 WHERE id = $2'[(newImageURL, id)]);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
