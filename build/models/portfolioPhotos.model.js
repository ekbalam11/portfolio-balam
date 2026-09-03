"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const photoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    url: {
        type: [String],
        required: true,
        validate: {
            validator: (urls) => urls.length >= 1,
            message: 'At least one URL is required'
        }
    },
    category: {
        type: [String],
        enum: [
            'portrait',
            'urban',
            'landscape',
            'sports',
            'nature',
            'culture',
            'other'
        ]
    },
    locationCountry: {
        type: String,
        required: true
    },
    locationCity: {
        type: String
    },
    coordinates: {
        type: {
            type: String,
            enum: ['Point']
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    }
});
const PhotoModel = (0, mongoose_1.model)('Photo', photoSchema);
exports.default = PhotoModel;
