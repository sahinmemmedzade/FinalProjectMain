import mongoose from 'mongoose';

const dislikeSchema = new mongoose.Schema({
    newsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Dislike = mongoose.model('Dislike', dislikeSchema);

export default Dislike;
