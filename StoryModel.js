const mongoose = require('mongoose');

const Story = mongoose.Schema({
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    caption: {
        type: String
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('Story', Story);