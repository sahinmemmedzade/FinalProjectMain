import express from 'express';
import { createNews, getAllNews, getSingleNews, deleteNews, updateNews } from '../controlller/news.controller.js';

const router = express.Router();
router.post('/', createNews); // Yeni xəbər yaratmaq üçün
router.get('/', getAllNews); // Bütün xəbərləri gətirmək üçün
router.get('/:id', getSingleNews); // Tək bir xəbəri gətirmək üçün
router.delete('/:id', deleteNews); // Xəbəri silmək üçün
router.patch('/:id', updateNews); // Xəbəri yeniləmək üçün

export default router;
