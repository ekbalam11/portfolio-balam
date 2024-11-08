const Photo = require('../models/portfolioPhotos.model');

const getHome = async(req, res) => {
    res.render('home', {
    })
};

const getPhotos = async(req, res) => {
    const photo = await Photo.find();
    res.render('portfolio', {
        photo    
    })
};

const getNewPhotoForm = async (req, res) => {
    const { idPhoto } =req.params;
    const url = await Photo.findById(idPhoto);
    res.render('new-photo', {
        url: {}
    })
};

const postNewPhoto = async(req, res) => {
    const { id, latitude, longitude } = req.body;
    console.log("🚀 ~ postNewPhoto ~ req.body:", req.body)
    if(id) {
        await Photo.findByIdAndUpdate(id, req.body);
        res.send('Foto modificada');
        return
    }

    const coordinates = latitude && longitude ? {
        type: 'Point',
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
    } : undefined;

    await Photo.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        url: req.body.url,
        category: req.body.category,
        coordinates: coordinates,
        locationCountry: req.body.locationCountry,
        locationCity: req.body.locationCity
    })
    res.send('Foto creada <a href="/portfolio"><button type= "submit"> Ir al Portfolio </button></a> <a href="/admin/new-photo"><button type= "submit"> Subir otra foto </button></a>'
    )
};

module.exports = {
    getHome,
    getPhotos,
    getNewPhotoForm,
    postNewPhoto
}