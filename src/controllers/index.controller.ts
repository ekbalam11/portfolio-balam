import nodemailer from 'nodemailer';
import path from 'path';
import type { Request, Response } from 'express';

import Photo from '../models/portfolioPhotos.model';

type MessageBody = {
    name: string;
    email: string;
    message: string;
};

type PhotoParams = {
    idPhoto: string;
};

export const getHome = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.render('home');
};

export const getDataPortfolio = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.render('data-portfolio');
};

export const getPhotos = async (
    req: Request,
    res: Response
): Promise<void> => {
    const photos = await Photo.find();

    res.render('portfolio', {
        photos
    });
};

export const getPhotoById = async (
    req: Request<PhotoParams>,
    res: Response
): Promise<void> => {
    const photos = await Photo.find();
    const { idPhoto } = req.params;
    const selectedPhoto = await Photo.findById(idPhoto);

    res.render('detail-photo', {
        photos,
        selectedPhoto
    });
};

export const getCV = async (
    req: Request,
    res: Response
): Promise<void> => {
    const filePath = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'resources',
        'BalamCastroCV2024.pdf'
    );

    res.download(
        filePath,
        'BalamCastroCV2024.pdf',
        (error?: Error) => {
            if (error) {
                console.error('Error downloading CV:', error);

                if (!res.headersSent) {
                    res.status(500).send('Error downloading CV');
                }
            }
        }
    );
};

export const postMessage = async (
    req: Request<{}, {}, MessageBody>,
    res: Response
): Promise<void> => {
    const emailPassword = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
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
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el mensaje');
    }
};