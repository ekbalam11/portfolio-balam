"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewPhoto = exports.getNewPhotoForm = exports.getPhotos = exports.getHome = void 0;
const portfolioPhotos_model_1 = __importDefault(require("../models/portfolioPhotos.model"));
const getHome = async (req, res) => {
    res.render('home');
};
exports.getHome = getHome;
const getPhotos = async (req, res) => {
    const photos = await portfolioPhotos_model_1.default.find();
    res.render('portfolio', {
        photo: photos
    });
};
exports.getPhotos = getPhotos;
const getNewPhotoForm = async (req, res) => {
    const { idPhoto } = req.query;
    if (!idPhoto) {
        res.render('new-photo', {
            url: {}
        });
        return;
    }
    const photo = await portfolioPhotos_model_1.default.findById(idPhoto);
    res.render('new-photo', {
        url: photo || {}
    });
};
exports.getNewPhotoForm = getNewPhotoForm;
const postNewPhoto = async (req, res) => {
    const { id, latitude, longitude, title, description, date, url, category, locationCountry, locationCity } = req.body;
    console.log('postNewPhoto req.body:', req.body);
    if (id) {
        await portfolioPhotos_model_1.default.findByIdAndUpdate(id, req.body);
        res.send('Foto modificada');
        return;
    }
    const coordinates = latitude && longitude
        ? {
            type: 'Point',
            latitude: Number.parseFloat(latitude),
            longitude: Number.parseFloat(longitude)
        }
        : undefined;
    await portfolioPhotos_model_1.default.create({
        title,
        description,
        date,
        url: Array.isArray(url) ? url : [url],
        category: category
            ? Array.isArray(category)
                ? category
                : [category]
            : undefined,
        coordinates,
        locationCountry,
        locationCity
    });
    res.send(`
        Foto creada
        <a href="/portfolio">
            <button type="submit">Ir al Portfolio</button>
        </a>
        <a href="/admin/new-photo">
            <button type="submit">Subir otra foto</button>
        </a>
    `);
};
exports.postNewPhoto = postNewPhoto;
