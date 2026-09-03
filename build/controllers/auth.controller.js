"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.postLoginForm = exports.getLoginForm = void 0;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const getLoginForm = (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Usuario" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>
    `);
};
exports.getLoginForm = getLoginForm;
const postLoginForm = (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER &&
        password === ADMIN_PASSWORD) {
        req.session.isAuthenticated = true;
        res.redirect('/portfolio');
        return;
    }
    res.status(401).send('Tú no eres Balam');
};
exports.postLoginForm = postLoginForm;
const logout = (req, res) => {
    console.log('Logout');
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send('Error al cerrar sesión');
            return;
        }
        res.redirect('/');
    });
};
exports.logout = logout;
