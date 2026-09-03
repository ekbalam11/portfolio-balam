"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.getCV = exports.getPhotoById = exports.getPhotos = exports.getDataPortfolio = exports.getHome = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const portfolioPhotos_model_1 = __importDefault(require("../models/portfolioPhotos.model"));
const getHome = async (req, res) => {
    res.render('home');
};
exports.getHome = getHome;
const getDataPortfolio = async (req, res) => {
    res.render('data-portfolio');
};
exports.getDataPortfolio = getDataPortfolio;
const getPhotos = async (req, res) => {
    const photos = await portfolioPhotos_model_1.default.find();
    res.render('portfolio', {
        photos
    });
};
exports.getPhotos = getPhotos;
const getPhotoById = async (req, res) => {
    const photos = await portfolioPhotos_model_1.default.find();
    const { idPhoto } = req.params;
    const selectedPhoto = await portfolioPhotos_model_1.default.findById(idPhoto);
    res.render('detail-photo', {
        photos,
        selectedPhoto
    });
};
exports.getPhotoById = getPhotoById;
const getCV = async (req, res) => {
    const filePath = path_1.default.join(__dirname, '..', '..', 'public', 'resources', 'BalamCastroCV2024.pdf');
    res.download(filePath, 'BalamCastroCV2024.pdf', (error) => {
        if (error) {
            console.error('Error downloading CV:', error);
            if (!res.headersSent) {
                res.status(500).send('Error downloading CV');
            }
        }
    });
};
exports.getCV = getCV;
const postMessage = async (req, res) => {
    const emailPassword = process.env.EMAIL_PASSWORD;
    const transporter = nodemailer_1.default.createTransport({
        service: 'hotmail',
        auth: {
            user: 'balam11@comunidad.unam.mx',
            pass: emailPassword
        }
    });
    const { name, email, message } = req.body;
    const mailOptions = {
        from: 'Mensaje del portfolio <balam11@comunidad.unam.mx>',
        to: 'ekbalam11@gmail.com',
        subject: 'New Message from Your Portfolio',
        text: `You have a new message from ${name} (${email}): ${message}`
    };
    try {
        await transporter.sendMail(mailOptions);
        res.send(`
            <script>
                alert('Me pondré en contacto contigo a la brevedad.');
                setTimeout(() => {
                    window.location.href = '/';
                }, 500);
            </script>
        `);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el mensaje');
    }
};
exports.postMessage = postMessage;
