const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10
    },
    type:{
        type: String,
        default: "income"
    },
    date: {
        type: Date,
        default: Date.now(),
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 100,
        trim: true,
        default: "No description"
    }
}, {timestamps: true})

module.exports = mongoose.model('Income', incomeSchema)