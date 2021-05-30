/**
 * REQUERIMIENTOS DE MODULOS DE NODEJS
 */

// Para manejar variables de entorno
const dotenv = require('dotenv').config();

// Importamos express
const express = require('express');
// const expressFileUpload = require('express-fileupload')
const app = express();

// Dependencia para el uso de rutas.
const path = require('path');

// Multer nos ayuda a gestionar el formato del fichero de nuestro server.
const multer = require('multer');

// fs nos permitira listar y obtener todos los archivos guardados en una carpeta.
const fs = require('fs');

// Modulo para gestionar la autentificacion de usuarios en el sistema.
const passport = require('passport');

// Modulo para gestion de errores por parte del usuario
const flash = require('connect-flash');

// Modulo para mostrar por consola los metodos http que llegan al servidor
const morgan = require('morgan');

// Modulo para poder administrar cookies
const cookieParser = require('cookie-parser');

const session = require('express-session');

// Configuracion:
// Variable PORT coge por defecto el puerto de la variable de entorno.
// En caso contrario coge el puerto 3000.
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');
app.set('views', path.join(__dirname, "..", 'views'));

// Motor de plantillas.
app.set('view engine', 'ejs');

// Ficheros estaticos
app.use(express.static(path.join(__dirname, "..", "public")));


// Los datos que se mandan entre el servidor y el cliente se mandan en formato JSON
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));


// CONEXION CON LA BASE DE DATOS
require(path.join(__dirname, "..", "config", "database.js"));

// Configuracion de passport
const passportRute = path.join(__dirname, "..", "config", "passport.js");
require(passportRute)(passport);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'elpepe',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Para pasar mensajes entre paginas html
app.use(flash());

// Rutas para comunicar la app con el html y css
const routesRoute = path.join(__dirname, "..", "routes", "routes.js");
require(routesRoute)(app, passport);

// SUBIDA DE ARCHIVOS AL SERVIDOR

var dir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
fs.readdir(dir, function (err, files) {
	if (err) {
		onerror(err);
		return;
	}
	else if (files.length == 0)
		console.log('No existen archivos.');
	else
		console.log(files);
});

// req: informacion de la peticion
// file: archivo que se esta subiendo
// cb: aquello que se va a llamar cuando esta funcion termine.

const storage = multer.diskStorage({
	destination: dir,
	filename: function (req, file, cb) {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir.
		cb(null, Date.now() + file.originalname);
	}
});

const upload = multer({ storage: storage });
// en el upload.single('...'), ahi dentro tiene que coincidir con el nombre
// del formulario donde se indica el name=""
app.post("/upload", upload.array('avatar'), (req, res, next) => { res.redirect('/save') });

app.use(function(req, res, next){
    res.status(404).render('404', {title: "Sorry, page not found"});
});

app.listen(app.get('port'), app.get('host'), () => {
	console.log('Server is up on port:', app.get('port'),'on host:', app.get('host'));
});
