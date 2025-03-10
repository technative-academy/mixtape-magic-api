import express from 'express';

const router = express.Router();

// Get /api/me/
router.get('/', async, (req, res) => {
    const json = require('../../exampleData/me.json');
    res.status(200).json(json);
});

router.put('/', async, (req, res) => {
    
});

router.delete('/', async (req, res) => {
    
});

export default router;