import type { Request, Response } from 'express';

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

interface LoginBody {
    username?: string;
    password?: string;
}

export const getLoginForm = (
    req: Request,
    res: Response
): void => {
    res.send(`
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Usuario" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>
    `);
};

export const postLoginForm = (
    req: Request<{}, {}, LoginBody>,
    res: Response
): void => {
    const { username, password } = req.body;

    if (
        username === ADMIN_USER &&
        password === ADMIN_PASSWORD
    ) {
        req.session.isAuthenticated = true;

        res.redirect('/portfolio');
        return;
    }

    res.status(401).send('Tú no eres Balam');
};

export const logout = (
    req: Request,
    res: Response
): void => {
    console.log('Logout');

    req.session.destroy((error) => {
        if (error) {
            res.status(500).send('Error al cerrar sesión');
            return;
        }

        res.redirect('/');
    });
};