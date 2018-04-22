const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  image: {type: Buffer},
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId, ref:'Job'
    }
  ]
});

module.exports =  mongoose.model("User", userSchema);
