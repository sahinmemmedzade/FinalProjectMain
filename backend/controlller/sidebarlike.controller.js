// controllers/sidebar.controller.js
import SidebarNews from '../model/sidebarnews.model.js';

// Increase like count for sidebar news
export const increaseSidebarLike = async (newsId, res) => {
    try {
        const news = await SidebarNews.findById(newsId);
        if (!news) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }

        news.likes += 1;
        await news.save();

        res.status(200).send({ likes: news.likes });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Decrease like count for sidebar news
export const decreaseSidebarLike = async (newsId, res) => {
    try {
        const news = await SidebarNews.findById(newsId);
        if (!news) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }

        if (news.likes > 0) {
            news.likes -= 1;
            await news.save();
            res.status(200).send({ likes: news.likes });
        } else {
            res.status(400).send({ error: 'Beğeni sayısı zaten sıfır.' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
export const increaseSidebarDislike = async (newsId, res) => {
    try {
        const news = await SidebarNews.findById(newsId);
        if (!news) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }

        news.dislikes += 1;
        await news.save();

        res.status(200).send({ dislikes: news.dislikes });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Decrease dislike count for sidebar news
export const decreaseSidebarDislike = async (newsId, res) => {
    try {
        const news = await SidebarNews.findById(newsId);
        if (!news) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }

        if (news.dislikes > 0) {
            news.dislikes -= 1;
            await news.save();
            res.status(200).send({ dislikes: news.dislikes });
        } else {
            res.status(400).send({ error: 'Beğenmeme sayısı zaten sıfır.' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
