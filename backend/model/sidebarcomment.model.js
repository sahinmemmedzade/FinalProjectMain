import mongoose from 'mongoose';

const sidebarCommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    sidebarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SidebarNews', // Örneğin SidebarNews modeline referans verildiği varsayımıyla
        required: true,
    },
});

const SidebarComment = mongoose.model('SidebarComment', sidebarCommentSchema);

export default SidebarComment;
