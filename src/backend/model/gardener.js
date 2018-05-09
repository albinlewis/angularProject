const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

// every gardener have to be unique
const gardenerSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  adress : {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('Gardener', gardenerSchema);
