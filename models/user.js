const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    profile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    about: String,
    role: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        type: String,
        default: ''
    }
},
    { timestamps: true });
userSchema.virtual('password')
    .set(function (password) {
        //create a temporary varible _password
        this._password = password
        //generate salt
        this.salt = this.makeSalt()
        //encryptpassword
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password;
    })

userSchema.methods = {
    //To check the user entered password
    authenticate: function (planText) {
        return this.encryptPassword(planText) === this.hashed_password;
    },
    //to encrypt the password for storing in DB
    encryptPassword: function (password) {
        if (!password)
            return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return ''
        }
    },
    // to make salt used in process of encrypting
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}


module.exports = mongoose.model('User', userSchema);