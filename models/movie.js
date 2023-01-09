const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const movieSchema = new mongoose.Schema({
    
    movieDirector: {
        type: String,
        required: false,
        trim: true
    },
    movieTitle: {
        type: String,
        required: false      
    },
    movieDate: {    
        type: Date,
        required: false,
        default: Date.now
    },
    movieGenre: {
        type: String,
        required: false
    },
    movieRating: {
        type: Number,
        required: false
    }
});  
   
module.exports = mongoose.model('movie', movieSchema);