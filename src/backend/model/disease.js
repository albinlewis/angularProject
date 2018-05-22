const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    crop_id: {
        type: Number, ref: "Plant"
    },
    name: {
        type: String,
        required: true
    },
    eppo_code:{
        type: String
    },
    symptoms: {
        type: String,
    },
    leaf_wetness: {
        type: String
    },
    bbch_from: Number,
    bbch_to: Number,
    example_url: String,
    celsius_low: Number,
    celsius_high: Number,
    humidity_from: Number,
    humidity_to: Number,
    created: {
        type: Date,
        required: true
    },
    modified:{
        type: Date,
        required: true
    },
    detection_supported: {
        type: Boolean
    }

});

module.exports = mongoose.model('Disease', diseaseSchema);
