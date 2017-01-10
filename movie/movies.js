'use strict';

const mongoose = require('mongoose');

const Movies = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('movies', Movies);