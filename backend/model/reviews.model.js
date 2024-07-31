import mongoose from 'mongoose';

export const reviewSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',
        required: true,
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
