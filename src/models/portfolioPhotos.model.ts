import { Schema, model } from 'mongoose';

export type PhotoCategory =
    | 'portrait'
    | 'urban'
    | 'landscape'
    | 'sports'
    | 'nature'
    | 'culture'
    | 'other';

export interface Photo {
    title: string;
    description?: string;
    date?: string;
    url: string[];
    category?: PhotoCategory[];
    locationCountry: string;
    locationCity?: string;
    coordinates?: {
        type?: 'Point';
        latitude?: number;
        longitude?: number;
    };
}

const photoSchema = new Schema<Photo>({
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
            validator: (urls: string[]) => urls.length >= 1,
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

const PhotoModel = model<Photo>('Photo', photoSchema);

export default PhotoModel;