"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'development-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production'
    }
}));
app.use((req, res, next) => {
    res.locals.isAdmin = req.session.isAuthenticated === true;
    next();
});
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(process.cwd(), 'views'));
app.use('/', index_routes_1.default);
app.use('/', auth_routes_1.default);
app.use('/admin', (req, res, next) => {
    if (req.session.isAuthenticated) {
        return next();
    }
    return res.redirect('/login');
});
app.use('/', admin_routes_1.default);
exports.default = app;
