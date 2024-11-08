const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;


const getLoginForm = (req, res) => {
    res.send(` 
        <form method = "POST" action = "/login">
            <input type="username" name= "username" placeholder= "Usuario" requires />
            <input type="password" name= "password" placeholder= "Contraseña" required />
            <button type= "submit"> Iniciar sesión </button>
        `); 
}

const postLoginForm = (req, res) => {

    const { username, password } = req.body;

    if (username === USER && password === PASSWORD) {
        req.session.isAuthenticated = true; //Falta agregar validación REGEX
        res.locals.isAdmin = true;

        res.redirect('/portfolio');
    } else {
        res.send('Tú no eres Balam');
    }
}

const logout = (req, res) => {
    console.log('Logout');
    
    req.session.destroy(err => {
        if (err) {
            return res.send('Error al cerrar sesión');
        }
        res.redirect('/');
    });
}

module.exports = {
    getLoginForm,
    postLoginForm,
    logout
}