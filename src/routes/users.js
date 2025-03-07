import express from 'express';

const router = express.Router();

// GET /api/users/
router.get('/', async (req, res) => {
    // return example JSON data - remove once database query is implemented
    const json = require('../../exampleData/users.json');
    res.status(200).json(json);
});

export default router;