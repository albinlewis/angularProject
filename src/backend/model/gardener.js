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
  },
  email: {
    type: String,
    unique: true
  },
  phone : String,
  latitude: {
      type : Number,
      require: true
  } ,
  longitude: {
      type: Number,
      require: true
  }
});

module.exports = mongoose.model('Gardener', gardenerSchema);
