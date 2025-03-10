import express from 'express';
import meJson from '../../exampleData/me.json' with { type: 'json' };

const router = express.Router();

// Get /api/me/
router.get('/', async, (req, res) => {
    const json = meJson;
    res.status(200).json(json);
});

router.put('/', async, (req, res) => {});

router.delete('/', async (req, res) => {});

export default router;
