const { Schema, model } = require('mongoose');

const photoSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    date: {
        type: String,
        required: false,
        unique: false
    },
    url: {
        type: [String],
        min: 1,
        required: true
    },
    category: {
        type: [String],
        enum: ['portrait', 'urban', 'landscape', 'sports', 'nature', 'culture', 'other'],
        unique: false
    },
    locationCountry: {
        type: String,
        required: true
    },
    locationCity: {
        type: String,
        required: false
    },
    coordinates: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
        }
    }
});

const Photo = model('Photo', photoSchema);
module.exports = Photo;