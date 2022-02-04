const mongoose = require("mongoose")
const moment = require("moment")

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    profile_pic: {
        type: String,
        default: 'empty-avatar.png'
    },
    cover_pic: {
        type: String,
        default: 'empty-cover-pic.jpg'
    },
    authToken: String,
    account_Confirmed: {
        type: Boolean,
        default: false
    },
    Bring_chicks: {
        type: Object,
        default: {
            chicks: 0,
            price: 0,
            buyDate: null,
            salesDate: null
        }
    },
    die_chicks: {
        type: Array,
        default: []
    },
    feed: {
        type: Array,
        default: []
    },
    finishFeed: {
        type: Array,
        default: []
    },
    medicine: {
        type: Array,
        default: []
    },
    others: {
        type: Array,
        default: []
    },
    createdAt: {
        type: String,
        default: moment().format("DD/MM/YYYY") + " - " + moment().format("hh:mm:ss")
    },
    updatedAt: {
        type: String,
        default: moment().format("DD/MM/YYYY") + " - " + moment().format("hh:mm:ss")
    }
})


const User = new mongoose.model('User', userSchema)

module.exports = User;