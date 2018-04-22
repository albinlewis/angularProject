const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    eppo_code:{
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    modified_image: {
        type: String,
        required: true
    },
    has_nutrient:{
        type: Boolean
    },
    created: {
        type: Date,
        required: true
    },
    modified:{
        type: Date,
        required: true
    },
    detection_supported: {
        type: Boolean,
        required: true
    }

});

module.exports = mongoose.model('Plant', plantSchema);