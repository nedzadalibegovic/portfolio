const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sha1: String,
    url: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Image', ImageSchema);