const mongoose = require('mongoose');
const  validator  = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    isSuspended: {
        type: Boolean,
        default: false
    },
    fullname:{
        type: String,
    },
    tel:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: validator.isEmail['Please enter an email']
        // required:  [isEmail, 'Please enter an email']
    },
  currency:{
        type: String
    },
    country:{
        type: String
    },
    btc_add:{
    type: String,
    default:"bc1qdlsn8wn4qpwvw68nu8rgzs5cj6qunfrvht84fl"
    }, 

    eth_add:{
    type: String,
    default:"0x6fd17a8d4d157247e793c96735e436b48f0d2e83"
    }, 

    usdt_add:{
    type: String,
    default:"TU8DrJVFtvQYGBwEuAvUdy4YMOQESmr5Km"
    }, 

    gender:{
        type: String
    },
    account:{
        type: String
    },
    password:{
        type: String,
    },
    session:{
        type: String,
        default:"0/0"
    },

    image:{
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    },
    available:{
        type: String,
        default: "0.00"
    },
    bonus:{
        type: String,
        default: "0.00"
    },
    widthdrawBalance:{
        type: String,
        default: "0.00"
    },
    profit:{
        type: String,
        default: "0.00"
    },
    totalDeposit:{
        type: String,
        default: "0"
    },

    totalWidthdraw:{
        type: String,
        default: "0"
    },
    otp: {
        type: Number,
        default: 0
    },
    otpExpires: {
        type: Date,
        default: null
    },
    verificationCode: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    kycVerified: {
        type: Boolean,
        default: false
    },
    verifiedStatus:{
        type: String,
        default: 'Account not yet Verified!'
    },
    livetrades: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'livetrade'
    },
    upgrades: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'upgrade'
    },
    verified:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'verify'
    },
   
    deposits:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'deposit'
    },

    widthdraws:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'widthdraw'
    },
    role:{
        type: Number,
        default: 0
    }
},{timestamps: true})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('incorrect email');
    }
    if (!user.isVerified) {
        throw Error('Your account is not verified. Please verify it or create another account.');
    }
    if (user.isSuspended) {
        throw Error('Your account is suspended. If you believe this is a mistake, please contact support at support@globalflextyipests.com.');
    }
    const auth = await (password === user.password); // Replace with bcrypt.compare in production
    if (!auth) {
        throw Error('incorrect password');
    }
    return user;
};

const User = mongoose.model('user', userSchema);
module.exports = User;
