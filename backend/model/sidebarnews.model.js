// model/sidebarNews.model.js
import mongoose from 'mongoose';

const sidebarNewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
});

const SidebarNews = mongoose.model('SidebarNews', sidebarNewsSchema);

export default SidebarNews;
