const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session')
dotenv.config();

//public routes
const indexRoutes = require('../routes/index.routes')
//admin routes
const adminRoutes = require('../routes/admin.routes')
//auth routes
const authRoutes = require('../routes/auth.routes')

//Express server instance
const app = express();

//Middleware to process post requests for *forms* with Express
app.use(express.urlencoded({ extended: true }));

//Session config
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //secure: true in production with HTTPS
}))
app.use((req, res, next) => {
    res.locals.isAdmin = req.session.isAuthenticated;
    next();
});

//Middleware for the get requests to be public
app.use(express.static('public'));

//EJS as template engine
app.set('view engine', 'ejs');

//Middleware to protect admin routes
app.use('/admin', (req, res, next) => {
    if (req.session.isAuthenticated){
        res.locals.isAdmin = true;
        next()
    } else {
        res.redirect('/login')
    }
})

//routes
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use(authRoutes); //'./routes/auth.js

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to the database');
};
connectDB().catch(err => console.log(err))

//Server init
const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log(`Server listening correctly in port: ${PORT}`)
});


// Export your app as a serverless function handler
module.exports = (req, res) => {
    app(req, res);
};