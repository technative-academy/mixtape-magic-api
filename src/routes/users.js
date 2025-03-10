import express from 'express';
import usersJson from '../../exampleData/users.json' assert { type: 'json' };


const router = express.Router();

// GET /api/users/
router.get('/', async (req, res) => {
    // return example JSON data - remove once database query is implemented
    const json = usersJson;
    res.status(200).json(json);
});

export default router;