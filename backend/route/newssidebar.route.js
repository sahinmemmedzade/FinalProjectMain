import express from 'express';
import { createSidebarNews, getAllSidebarNews, getSingleSidebarNews, updateSidebarNews, deleteSidebarNews } from '../controlller/newssidebar.controller.js';
import { incrementSidebarNewsViews } from '../controlller/sidebarnewsviews.controller.js';
const router = express.Router();

router.post('/sidebar-news', createSidebarNews); // Yeni xəbər yaratmaq üçün
router.get('/sidebar-news', getAllSidebarNews); // Bütün xəbərləri gətirmək üçün
router.get('/sidebar-news/:id', getSingleSidebarNews); // Tək bir xəbəri gətirmək üçün
router.patch('/sidebar-news/:id', updateSidebarNews); // Xəbəri yeniləmək üçün
router.delete('/sidebar-news/:id', deleteSidebarNews); // Xəbəri silmək üçün
router.post('/sidebar-news/views/:sidebarnewsId', async (req, res) => {
    const { sidebarnewsId } = req.params;
    try {
        const updatedViews = await incrementSidebarNewsViews(sidebarnewsId);
        return res.status(200).send({ views: updatedViews });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
router.post('/sidebar-news/views/:sidebarnewsId', async (req, res) => {
    const { sidebarnewsId } = req.params;
    try {
        const updatedViews = await incrementSidebarNewsViews(sidebarnewsId);
        return res.status(200).send({ views: updatedViews });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
export default router;
