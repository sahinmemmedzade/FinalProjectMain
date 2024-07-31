import express from 'express';
import {
    createBreakingNews,
    getAllBreakingNews,
    updateBreakingNews,
    deleteBreakingNews
} from '../controlller/Breakingnews.controller.js';

const router = express.Router();

// Create a new breaking news
router.post('/', createBreakingNews);

// Get all breaking news
router.get('/', getAllBreakingNews);

// Update breaking news by ID
router.patch('/:id', updateBreakingNews);

// Delete breaking news by ID
router.delete('/:id', deleteBreakingNews);

export default router;
