import SidebarNews from '../model/sidebarnews.model.js';

// Increase dislike count for sidebar news
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
