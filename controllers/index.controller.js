const Message = require('../models/Message.model');
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

const getPhotoById = async (req, res) => {
    const photos = await Photo.find();
    const { idPhoto } = req.params;
    const selectedPhoto = await Photo.findById(idPhoto);
    res.render('detail-photo', {
        photos,
        selectedPhoto
    })
};

const postMessage = async (req, res) => {
    try {
        const message = req.body;
        await Message.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        res.send(`<script>alert('Mensaje enviado correctamente!'); window.location.href = '/';</script>`)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el mensaje');
    }
}

module.exports = {
    getHome,
    getPhotos,
    getPhotoById,
    postMessage
}