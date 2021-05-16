/**
 * REQUERIMIENTOS DE MODULOS DE NODEJS
 */

// Para manejar variables de entorno
const dotenv = require('dotenv');

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

const fileRoutesRoute = path.join(__dirname, "..", "routes", "fileRoutes.js");
const initFileRoute = require(fileRoutesRoute);
initFileRoute(app);

// SUBIDA DE ARCHIVOS AL SERVIDOR
fs.readdir(path.join(__dirname, "..", "uploads"), function (err, files) {
	if (err) {
		onerror(err);
		return;
	}
	else if (files.length == 0)
		console.log('No existen archivos.');
	else
		console.log(files);
});

/*
const mime = {
	'html' : 'text/html',
	'css'  : 'text/css',
	'jpg'  : 'image/jpg',
	'ico'  : 'image/x-icon',
	'mp3'  :'audio/mpeg3',
	'mp4'  : 'video/mp4'
 };
*/

// req: informacion de la peticion
// file: archivo que se esta subiendo
// cb: aquello que se va a llamar cuando esta funcion termine.

const storage = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads"),
	filename: function (req, file, cb) {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir.
		cb(null, Date.now() + path.extname(file.originalname));
	}
});
/*
const storageImg = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads", "img"),
	filename: function (req, file, cb) {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir.
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});

const storageVideo = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads", "videos"),
	filename: function (req, file, cb) {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir.
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});

const storageMusic = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads", "music"),
	filename: function (req, file, cb) {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir.
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});

const uploadImg = multer({ storage: storageImg });
const uploadVideo = multer({ storage: storageVideo });
const uploadMusic = multer({ storage: storageMusic });
*/
const upload = multer({ storage: storage });
// en el upload.single('...'), ahi dentro tiene que coincidir con el nombre
// del formulario donde se indica el name=""
app.post("/upload", upload.array('avatar', 12), (req, res, next) => {
	let file = req.files;
	// if (req.file == undefined) {
	// 	return res.status(400).send({ message: "Please upload a file!" });
	// }
	if (!file)
		return res.status(400).send({ message: "Please upload a file!" });
	else
		res.redirect('/upload');
});
app.listen(app.get('port'), () => {
	console.log('Server is up on port: ', app.get('port'))
});
