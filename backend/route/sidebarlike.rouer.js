// routes/sidebar.routes.js
import express from 'express';
import mongoose from 'mongoose';
import { increaseSidebarLike, decreaseSidebarLike  } from '../controlller/sidebarlike.controller.js';

const router = express.Router();

// Increase like count for sidebar news
router.post('/:sidebarnewsId/increase', async (req, res) => {
    const { sidebarnewsId } = req.params;

    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(sidebarnewsId);
        if (!isValidObjectId) {
            return res.status(400).send({ error: 'Invalid newsId format' });
        }

        await increaseSidebarLike(sidebarnewsId, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Decrease like count for sidebar news
router.post('/:sidebarnewsId/decrease', async (req, res) => {
    const { sidebarnewsId } = req.params;

    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(sidebarnewsId);
        if (!isValidObjectId) {
            return res.status(400).send({ error: 'Invalid newsId format' });
        }

        await decreaseSidebarLike(sidebarnewsId, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
router.post('/:sidebarnewsId/dislike/increase', async (req, res) => {
    const { sidebarnewsId } = req.params;

    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(sidebarnewsId);
        if (!isValidObjectId) {
            return res.status(400).send({ error: 'Invalid newsId format' });
        }

        await increaseSidebarDislike(sidebarnewsId, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Decrease dislike count for sidebar news
router.post('/:sidebarnewsId/dislike/decrease', async (req, res) => {
    const { sidebarnewsId } = req.params;

    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(sidebarnewsId);
        if (!isValidObjectId) {
            return res.status(400).send({ error: 'Invalid newsId format' });
        }

        await decreaseSidebarDislike(sidebarnewsId, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
export default router;
