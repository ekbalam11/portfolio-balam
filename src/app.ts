import express from 'express';
import session from 'express-session';
import path from 'path';

import indexRoutes from './routes/index.routes';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'development-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production'
        }
    })
);

app.use((req, res, next) => {
    res.locals.isAdmin = req.session.isAuthenticated === true;
    next();
});

app.use(express.static(path.join(process.cwd(), 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use('/', indexRoutes);
app.use('/', authRoutes);

app.use('/admin', (req, res, next) => {
    if (req.session.isAuthenticated) {
        return next();
    }
    return res.redirect('/login');
});

app.use('/', adminRoutes);

export default app;