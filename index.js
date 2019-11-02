const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

require('dotenv').config({ path: 'variables.env'})

// helpers con funciones
const helpers = require('./helpers');

// Crear conexion DB
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado'))
    .catch(error => console.log(error))

const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended : true }))

// app.use(expressValidator);


app.set('views', path.join(__dirname, './views'))

app.use(flash());

app.use(cookieParser());

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    console.log(res.locals.usuario);
    next();
})

app.use('/', routes())

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});