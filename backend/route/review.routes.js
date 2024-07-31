import express from 'express';
import { createReview, getAllReviews, updateReview, deleteReview } from '../controlller/review.controller.js';
import { protectRoutes } from '../midleware/protectRoutes.js';
const router = express.Router();

router.post("/:newsId",protectRoutes, createReview); // Review yaratma
router.get('/', getAllReviews); // Bütün review-ları gətirmək
router.patch('/:id', updateReview); // Review yeniləmək
router.delete('/:id', deleteReview); // Review silmək

export default router;
