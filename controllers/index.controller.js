const nodemailer = require('nodemailer');
const path = require('path')
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

const getCV = async (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'resources', 'BalamCastroCV2024.pdf');

    res.download(filePath, 'BalamCastroCV2024.pdf', (err) => {
        if (err) {
            console.error('Error downloading CV: ', err);
            res.status(500).send('Error downloading CV');
        }
    })
}

const postMessage = async (req, res) => {

    const emailPasword = process.env.EMAIL_PASSWORD;
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'balam11@comunidad.unam.mx',
            pass: emailPasword
        }
    });

    const mailOptions = {
        from: 'Mensaje del portfolio <balam11@comunidad.unam.mx>',
        to: 'ekbalam11@gmail.com',
        subject: 'New Message from Your Portfolio',
        text: `You have a new message from ${req.body.name} (${req.body.email}): ${req.body.message}`
    };
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);

            }
        });
        res.send(`
  <script>
      alert('Me pondré en contacto contigo a la brevedad.');
    setTimeout(() => {
        window.location.href = '/'
        }, 500);
  </script>`)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el mensaje');
    }
}


module.exports = {
    getHome,
    getPhotos,
    getPhotoById,
    getCV,
    postMessage
}