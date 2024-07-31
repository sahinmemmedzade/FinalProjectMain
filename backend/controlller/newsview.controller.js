import News from '../model/news.model.js';
import NewsViews from '../model/news.viewmodel.js';

export const incrementNewsViews = async (newsId, userId) => {
    try {
        let newsViews = await NewsViews.findOne({ newsId });

        if (!newsViews) {
            newsViews = new NewsViews({ newsId, count: 0, visitors: [] });
        }

        if (newsViews.visitors && newsViews.visitors.includes(userId)) {
            return newsViews.count;
        } else {
            newsViews.count += 1;
            if (!newsViews.visitors) {
                newsViews.visitors = [];
            }
            newsViews.visitors.push(userId);

            await newsViews.save();

            const news = await News.findByIdAndUpdate(
                newsId,
                { $inc: { views: 1 } },
                { new: true }
            );

            if (!news) {
                throw new Error('News not found');
            }

            return news.views;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
