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
        type: String
    },
    image_url: {
        type: String
    },
    modified_image: {
        type: String
    },
    has_nutrient:{
        type: Boolean
    },
    has_disease:{
        type: Boolean,
        default: false
    },
    created: {
        type: Date
    },
    modified:{
        type: Date
    },
    detection_supported: {
        type: Boolean
    }

});

module.exports = mongoose.model('Plant', plantSchema);