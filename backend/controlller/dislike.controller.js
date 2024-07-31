import Dislike from '../model/dislike.model.js';
import News from '../model/news.model.js';
import mongoose from 'mongoose';

// Beğenmeme sayısını artırma
export const increaseDislike = async (newsId, res) => {
    try {
        const news = await News.findById(newsId);
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

// Beğenmeme sayısını azaltma
export const decreaseDislike = async (newsId, res) => {
    try {
        const news = await News.findById(newsId);
        if (!news) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }

        if (news.dislikes > 0) {
            news.dislikes -= 1;
        } else {
            return res.status(400).send({ error: 'Beğenmeme sayısı zaten sıfır.' });
        }

        await news.save();

        res.status(200).send({ dislikes: news.dislikes });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
