// views.route.js

import express from 'express';
import { incrementNewsViews } from '../controlller/newsview.controller.js';
const router = express.Router();

// Baxis sayini artirmaq
router.post('/views/:newsId', async (req, res) => {
    const { newsId } = req.params;
    try {
        const updatedViews = await incrementNewsViews(newsId);
        return res.status(200).send({ views: updatedViews });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});





export default router;
