const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema(
    {
        _id: String,
        url: String,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model('Image', ImageSchema);
