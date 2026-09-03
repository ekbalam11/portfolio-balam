import type { Request, Response } from 'express';

import Photo from '../models/portfolioPhotos.model';
import type {
    PhotoCategory
} from '../models/portfolioPhotos.model';

interface PhotoQuery {
    idPhoto?: string;
}

interface NewPhotoBody {
    id?: string;
    title: string;
    description?: string;
    date?: string;
    url: string | string[];
    category?: PhotoCategory | PhotoCategory[];
    latitude?: string;
    longitude?: string;
    locationCountry: string;
    locationCity?: string;
}

export const getHome = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.render('home');
};

export const getPhotos = async (
    req: Request,
    res: Response
): Promise<void> => {
    const photos = await Photo.find();

    res.render('portfolio', {
        photo: photos
    });
};

export const getNewPhotoForm = async (
    req: Request<{}, {}, {}, PhotoQuery>,
    res: Response
): Promise<void> => {
    const { idPhoto } = req.query;

    if (!idPhoto) {
        res.render('new-photo', {
            url: {}
        });
        return;
    }

    const photo = await Photo.findById(idPhoto);

    res.render('new-photo', {
        url: photo || {}
    });
};

export const postNewPhoto = async (
    req: Request<{}, {}, NewPhotoBody>,
    res: Response
): Promise<void> => {
    const {
        id,
        latitude,
        longitude,
        title,
        description,
        date,
        url,
        category,
        locationCountry,
        locationCity
    } = req.body;

    console.log('postNewPhoto req.body:', req.body);

    if (id) {
        await Photo.findByIdAndUpdate(id, req.body);

        res.send('Foto modificada');
        return;
    }

    const coordinates =
        latitude && longitude
            ? {
                  type: 'Point' as const,
                  latitude: Number.parseFloat(latitude),
                  longitude: Number.parseFloat(longitude)
              }
            : undefined;

    await Photo.create({
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