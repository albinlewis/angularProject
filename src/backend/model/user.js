const mongoose = require('mongoose');
const crypt = require('password-hash');
const uniqueValidator = require('mongoose-unique-validator');

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
        required: true
    },
    image_url: {
        type: String,
        default: "default-profile.png"
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(uniqueValidator);

/** Verifies raw password with db hash */
userSchema.methods.verifyPassword = function (password, next) {
    return crypt.verify(password, this.password);
};
/** Encrypts the password before saving */
userSchema.pre('save', function (next) {
    this.password = crypt.generate(this.password);
    next();
});
/** If not already encrypted: Encrypt the password before updating */
userSchema.pre('update', function (next) {
    if (!crypt.isHashed(this.password)) {
        this.password = crypt.generate(this.password);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
