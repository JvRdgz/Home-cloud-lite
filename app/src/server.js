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
const routesRute = path.join(__dirname, "..", "routes", "routes.js");
require(routesRute)(app, passport);

// const routesFilesRoute = path.join(__dirname, "..", "routes", "routesFiles.js");
// require(routesFilesRoute);

/*
// En esta variable se guarda toda la gestion de la subida de archivos al servidor
let storage = multer.diskStorage({
	destination:(req, file, callback) => {
		// Ruta donde se van a guardar los archivos.
		callback(null, '/files')
	},
	filename:(req, file, callback) => {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir.
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
*/

// const upload = multer({ storage });

// Nuestro ENDPOINT
// app.get('/', (req, res) => {
//     // Este mensaje hay que mandarselo al frontend
//     return res.send('This is the home page!!!!');
// });

/*
app.post('/upload', upload.single('file'), (req, res) => {
	console.log(`Storage location is ${req.hostname}/${req.file.path}`);
	return (res.send(req.file));
});
*/

// SUBIDA DE ARCHIVOS AL SERVIDOR
fs.readdir(path.join(__dirname, "..", "uploads"), function (err, files) {
	if (err) {
		onerror(err);
		return;
	}
	// Aqui deberia de mostrar todos los archivos, mandando esto al frontend
	else if (files.length == 0)
		console.log('No existen archivos.');
	else {
		console.log(files);
	}
});





















/*
const mime = {
	'html' : 'text/html',
	'css'  : 'text/css',
	'jpg'  : 'image/jpg',
	'ico'  : 'image/x-icon',
	'mp3'  :	'audio/mpeg3',
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
		// nunca se va repetir, y concatenamos la extension del archivo con mimeType
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});
/*
const storageImg = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads", "img"),
	filename: function (req, file, cb) {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir, y concatenamos la extension del archivo con mimeType
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});

const storageVideo = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads", "videos"),
	filename: function (req, file, cb) {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir, y concatenamos la extension del archivo con mimeType
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});

const storageMusic = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads", "music"),
	filename: function (req, file, cb) {
		// Aqui se va a crear un nombre para nuestro fichero.
		// El nombre se puede modificar, pero el nombre por defecto
		// nunca se va repetir, y concatenamos la extension del archivo con mimeType
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
app.post("/files", upload.array('avatar', 12), (req, res, next) => {
	let file = req.files;
	if (!file) {
		const error = new Error('No has elegido ningun archivo');
		error.httpStatusCode = 400;
		return next(error);
	}
	// SE PUEDEN GUARDsAR IMAGENES EN MONGODB
	// window.open("", "", "width=200,height=100");
	// return res.status(200).send({ message : `Fichero guardado con exito en ${req.hostname}/${req.file.path}.` });


	// RENDERIZAR VISTA /FILES Ver como hacer el download. Probar el comentado de abajo.
	res.redirect('/files');
});






















/*
// DESCARGA DE ARCHIVOS DESDE EL SERVIDOR
app.get("/files", (req, res, files) => {
	let ext = path.extname(req.params.file);
	if (files.length == 0)
		console.log('No existen archivos.')
	else {
		console.log(files);
	}
	/*
	if (!ext.match(/^\.(png|jpg)$/)) {
		return res.status(404).end()
	}
	*/
/*
	let fd = fs.createReadStream(path.join(__dirname, "..", "uploads",
		req.params.file));

	fd.on("error", (e) => {
		// SI NO ENCUENTRA EL ARCHIVO (ENOENT)
		if (e.code == "ENOENT") {
			res.status(404);

			if (req.accepts('html')) {
				res.setHeader("Content-Type", "text/html");

				res.write("<strong>Error:</strong> Archivo no encontrado.");
			}

			return res.end();
		}

		res.status(500).end();
	});

	res.setHeader("Content-Type", "image/" + ext.substr(1));

	res.send(files);

	fd.pipe(res);
});
*/
// app.use(expressFileUpload());

/*
app.post('/files', upload.single('avatar'), (req, res) => {
	var fileToUpload = fs.readFileSync(req.file.path);
	var encodeFile = fileToUpload.toString('base64');
	// Define a JSONobject for the file attributes for saving to database

	var finalFile = {
		contentType: req.file.mimetype,
		fileBuff: new Buffer(encodeFile, 'base64')
	};
	db.collection('files').insertOne(finalFile, (err, result) => {
		console.log(result);

		if (err) return console.log(err);

		console.log('Archivo guardado en la base de datos');
		res.redirect('/files');
	})
});
*/
/*
app.get('/files', (req, res) => {
	db.collection('mycollection').find().toArray((err, result) => {

		const imgArray = result.map(element => element._id);
		console.log(imgArray);

		if (err) return console.log(err)
		res.send(imgArray)

	})
});

app.get('/files/:id', (req, res) => {
	var filename = req.params.id;

	db.collection('mycollection').findOne({ '_id': ObjectId(filename) }, (err, result) => {

		if (err) return console.log(err)

		res.contentType('image/jpeg');
		res.send(result.image.buffer)


	})
})
*/









/*
app.get("/files", upload.array('download', 12), (req, res, next) => {
	let file = req.files;
	if (!file) {
		const error = new Error('No has elegido ningun archivo');
		error.httpStatusCode = 400;
		return next(error);
	}
	res.download(file);
});
*/

app.listen(app.get('port'), () => {
	console.log('Server is up on port: ', app.get('port'))
});
