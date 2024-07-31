import mongoose from 'mongoose';
import Review from './reviews.model.js';

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,

        required: true,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Yaradılma tarixini avtomatik olaraq təyin edir
    }
}, { timestamps: true }); // `createdAt` və `updatedAt` avtomatik əlavə ediləcəkdir

const News = mongoose.model('News', newsSchema);

export default News;
