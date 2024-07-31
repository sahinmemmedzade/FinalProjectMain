// models/advertisement.model.js

import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema({
    productPic: {
        type: String,
        required: true
    }
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

export default Advertisement;
