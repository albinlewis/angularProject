const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    image_url: {
        type: String,
        required: true
    },
    plant:{
        type: Number, ref:'Plant' ,
        required: true
    },
    resultId: {
        type: String,
        default: null
    },
    result: {
        type: [
            {
                confidence: Number,
                disease_id: {type: Number, ref: 'Disease'}
            }
        ]
    },
    finish: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Job', jobSchema);
