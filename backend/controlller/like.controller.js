
import News from '../model/news.model.js';
// increaseLike fonksiyonu

export const increaseLike = async (newsId, res) => {
    try {
        const news = await News.findById(newsId);
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

// decreaseLike fonksiyonu
export const decreaseLike = async (newsId, res) => {
    try {
        const news = await News.findById(newsId);
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
