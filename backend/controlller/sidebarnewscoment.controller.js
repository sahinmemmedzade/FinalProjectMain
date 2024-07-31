// review.controller.js

import SidebarNews from '../model/sidebarnews.model.js';
import Review from '../model/reviews.model.js';
import SidebarComment from '../model/sidebarcomment.model.js';
import User from '../model/auth.model.js'; // Adjust the path according to your project structure

export const createSidebarReview = async (req, res) => {
    try {
        const { comment } = req.body;
        const { sidebarnewsId } = req.params; // sidebarnewsId'yi parametre olarak al

        if (!comment || !sidebarnewsId) {
            return res.status(400).send({ error: 'Lütfen tüm gerekli alanları doldurun' });
        }

        // Authenticated user'in bilgilerini al
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ error: 'Kullanıcı bulunamadı' });
        }

        // SidebarNews öğesini bul
        const sidebarNews = await SidebarNews.findById(sidebarnewsId);
        if (!sidebarNews) {
            return res.status(404).send({ error: 'Sidebar News bulunamadı' });
        }

        // Yeni review oluştur
        const newReview = new Review({
            Username: user.userName,
            email: user.email,
            comment,
            news: sidebarNews._id // SidebarNews'e referans ver
        });

        await newReview.save();

        // SidebarNews'e review'i ekle
        sidebarNews.reviews.push(newReview._id);
        await sidebarNews.save();

        res.status(201).send(newReview);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Bütün sidebar comment-ləri gətir
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Review-u yenilə
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const {  comment } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            {  comment },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).send({ error: 'Review tapılmadı' });
        }

        res.status(200).send(updatedReview);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Review-u sil
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).send({ error: 'Review tapılmadı' });
        }

        res.status(200).send({ message: 'Review uğurla silindi' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
