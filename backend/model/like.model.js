// like.model.js

import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Kullanıcı modeline referans
        required: true,
    },
    newsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News', // Haber modeline referans
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
});

const Like = mongoose.model('Like', likeSchema);

export default Like;
