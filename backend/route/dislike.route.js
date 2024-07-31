import express from 'express';
import { increaseDislike, decreaseDislike } from '../controlller/dislike.controller.js';
import mongoose from 'mongoose';

const router = express.Router();

// Beğenmeme sayısını artırma
router.post('/:newsId/increase', async (req, res) => {
    const { newsId } = req.params;

    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(newsId);
        if (!isValidObjectId) {
            return res.status(400).send({ error: 'Invalid newsId format' });
        }

        await increaseDislike(newsId, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Beğenmeme sayısını azaltma
router.post('/:newsId/decrease', async (req, res) => {
    const { newsId } = req.params;

    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(newsId);
        if (!isValidObjectId) {
            return res.status(400).send({ error: 'Invalid newsId format' });
        }

        await decreaseDislike(newsId, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
