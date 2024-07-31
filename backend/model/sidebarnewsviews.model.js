// news.sidebar.js

import mongoose from 'mongoose';

const newsSidebarViewsSchema = new mongoose.Schema({
    sidebarnewsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SidebarNews',
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
});

const NewsSidebarViews = mongoose.model('NewsSidebarViews', newsSidebarViewsSchema);

export default NewsSidebarViews;
