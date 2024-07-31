import BreakingNews from '../model/breakinnews.model.js';

// Create a new breaking news
export const createBreakingNews = async (req, res) => {
    try {
        const { news } = req.body;
        if (!news) {
            return res.status(400).send({ error: 'Xəbəri daxil edin' });
        }
        const newBreakingNews = new BreakingNews({ news });
        await newBreakingNews.save();
        res.status(201).send(newBreakingNews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get all breaking news
export const getAllBreakingNews = async (req, res) => {
    try {
        const breakingNews = await BreakingNews.find();
        res.status(200).send(breakingNews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update breaking news by ID
export const updateBreakingNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { news } = req.body;
        if (!news) {
            return res.status(400).send({ error: 'Xəbəri daxil edin' });
        }
        const updatedBreakingNews = await BreakingNews.findByIdAndUpdate(id, { news }, { new: true });
        if (!updatedBreakingNews) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }
        res.status(200).send(updatedBreakingNews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete breaking news by ID
export const deleteBreakingNews = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBreakingNews = await BreakingNews.findByIdAndDelete(id);
        if (!deletedBreakingNews) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }
        res.status(200).send({ message: 'Xəbər silindi' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
