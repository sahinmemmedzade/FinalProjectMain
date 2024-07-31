import SidebarNews from '../model/sidebarnews.model.js';

// Yeni xəbər yaratmaq
export const createSidebarNews = async (req, res) => {
    try {
        const { title, description, date, views } = req.body;

        if (!title || !description) {
            return res.status(400).send({ error: 'Başlıq və təsvir təqdim edin' });
        }

        const newSidebarNews = new SidebarNews({ title, description, date, views });
        await newSidebarNews.save();

        res.status(201).send(newSidebarNews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Bütün xəbərləri gətirmək
// newssidebar.controller.js


// Tüm SidebarNews'leri ve ilgili review'ları getirme
export const getAllSidebarNews = async (req, res) => {
    try {
        const sidebarNews = await SidebarNews.find().populate('reviews');
        res.status(200).send(sidebarNews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Belirli bir SidebarNews ve ilgili review'ları getirme
export const getSingleSidebarNews = async (req, res) => {
    const { id } = req.params;

    try {
        const sidebarNews = await SidebarNews.findById(id).populate('reviews');
        if (!sidebarNews) {
            return res.status(404).send({ error: 'Sidebar News bulunamadı' });
        }
        res.status(200).send(sidebarNews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


// Xəbəri yeniləmək
// Xəbəri yeniləmək
export const updateSidebarNews = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, views } = req.body;

    try {
        let sidebarNews = await SidebarNews.findById(id);
        if (!sidebarNews) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }

        if (title) {
            sidebarNews.title = title;
        }

        if (description) {
            sidebarNews.description = description;
        }

       

        sidebarNews = await sidebarNews.save();
        res.status(200).send(sidebarNews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Xəbəri silmək
export const deleteSidebarNews = async (req, res) => {
    const { id } = req.params;

    try {
        const sidebarNews = await SidebarNews.findByIdAndDelete(id);
        if (!sidebarNews) {
            return res.status(404).send({ error: 'Xəbər tapılmadı' });
        }
        res.status(200).send({ message: 'Xəbər uğurla silindi' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
