import express from 'express';
import { increaseLike, decreaseLike } from '../controlller/like.controller.js';
import mongoose from 'mongoose';

const router = express.Router();

// Beğeni sayısını artırma
router.post('/:newsId/increase', async (req, res) => {
    const { newsId } = req.params;

    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(newsId);
        if (!isValidObjectId) {
            return res.status(400).send({ error: 'Invalid newsId format' });
        }

        await increaseLike(newsId, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Beğeni sayısını azaltma
router.post('/:newsId/decrease', async (req, res) => {
    const { newsId } = req.params;

    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(newsId);
        if (!isValidObjectId) {
            return res.status(400).send({ error: 'Invalid newsId format' });
        }

        await decreaseLike(newsId, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
