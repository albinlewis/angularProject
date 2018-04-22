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
        type: mongoose.Schema.Types.ObjectId, ref:'Plant' ,
        required: true
    },
    resultId: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Job', jobSchema);