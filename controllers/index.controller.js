const Photo = require('../models/portfolioPhotos.model');

const getHome = async (req, res) => {
    res.render('home', {
    })
};

const getPhotos = async (req, res) => {
    const photos = await Photo.find();
    res.render('portfolio', {
        photos
    })
};

const getPhotoById = async(req, res) => {
    const photos = await Photo.find();
    const { idPhoto } = req.params;
    const selectedPhoto = await Photo.findById(idPhoto);
    res.render('detail-photo', {
        photos,
        selectedPhoto
    })
};

module.exports = {
    getHome,
    getPhotos,
    getPhotoById
}