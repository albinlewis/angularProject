const mongoose = require('mongoose');
const crypt = require('password-hash');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    unique: true,
    required:true
  },
  image_url: {
    type: String,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId, ref:'Job'
    }
  ]
},
{
  timestamps:
  {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  }
});



userSchema.methods.verifyPassword = function(password, next) {
  return crypt.verify(password, this.password);
};

userSchema.pre('save', function(next) {
  this.password = crypt.generate(this.password);
  next();
});

userSchema.pre('update', function(next) {
  console.log(this.password);
  next();
});

let model = mongoose.model("User", userSchema);
module.exports = model;
