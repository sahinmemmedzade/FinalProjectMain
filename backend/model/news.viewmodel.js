import mongoose from 'mongoose';

const newsViewsSchema = new mongoose.Schema({
  newsId: { type: mongoose.Schema.Types.ObjectId, ref: 'News', required: true },
  count: { type: Number, default: 0 },
  visitors: { type: [String], default: [] } // visitor ID-ləri saxlayır
});

export default mongoose.model('NewsViews', newsViewsSchema);
