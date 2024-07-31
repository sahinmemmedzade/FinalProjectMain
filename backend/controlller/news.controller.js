import News from '../model/news.model.js';
import Category from '../model/category.model.js';
import mongoose from 'mongoose';

// Yeni xəbər yaratma


// Yeni xəbər yaratma
export const createNews = async (req, res) => {
    try {
        const { title, description, categoryName } = req.body;
        const image = req.file ? req.file.path : null;

        // Kateqoriyanı tapmaq
        const category = await Category.findOne({ name: categoryName }).exec();
        if (!category) {
            return res.status(400).send({ error: 'Kateqoriya tapılmadı' });
        }

        // Məlumatların yoxlanılması
        if (!title || !description || !categoryName || !image) {
            return res.status(400).send({ error: 'Zəhmət olmasa başlıq, təsvir, kateqoriya adı və şəkil təqdim edin' });
        }

        // Yeni xəbərin yaradılması
        const newNews = new News({ 
            title, 
            description, 
            categoryId: category._id, 
            image,
            createdAt: new Date(), // Tarixi əl ilə təyin edir
            updatedAt: new Date(), // Tarixi əl ilə təyin edir
        });
        await newNews.save();

        res.status(201).send(newNews); // `createdAt` və `updatedAt` daxil ediləcək
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const updateNews = async (req, res) => {
    const { id } = req.params;
    const { title, description, categoryId } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        let news = await News.findById(id);
        if (!news) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }

        if (title) {
            news.title = title;
        }

        if (description) {
            news.description = description;
        }

        if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
            news.categoryId = categoryId;
        }

        if (image) {
            news.image = image;
        }

        news = await news.save();
        res.status(200).send(news);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


// Bütün xəbərləri gətir
export const getAllNews = async (req, res) => {
    try {
        const news = await News.find()
            .populate('categoryId', 'name') // `categoryId` sahəsinin `name`-ini daxil et
            .populate('reviews'); // 'reviews' sahəsini cəmlə
        res.status(200).send(news);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// newsController.js
export const getSingleNews = async (req, res) => {
    const { id } = req.params;
    try {
        const news = await News.findById(id)
            .populate('categoryId', 'name')
            .populate('reviews');

        if (!news) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }
        res.status(200).send(news);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


// Xəbəri sil
export const deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }
        res.status(200).send({ message: 'Xəbər uğurla silindi' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
