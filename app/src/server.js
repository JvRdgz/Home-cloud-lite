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
// En caso contrario coge el puerto 4000.
app.set('port', process.env.PORT || 4000);
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
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(morgan('dev'));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'key',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Para pasar mensajes entre paginas html
app.use(flash());

// Rutas para comunicar la app con el html y css
const routesRoute = path.join(__dirname, "..", "routes", "routes.js");
require(routesRoute)(app, passport);

// SUBIDA DE ARCHIVOS AL SERVIDOR
/*
const userTransform = email.split('@');
const userName = userTransform[0];

console.log("USERNAME: ", userName);
// const dir = path.join(__dirname, "..", userName);
*/

const dir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(dir)) {
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
		let ts = Date.now();

		let date_ob = new Date(ts);
		let date = date_ob.getDate();
		let month = date_ob.getMonth() + 1;
		let year = date_ob.getFullYear();
		let finalDate = date + "-" + month + "-" + year + "_" + ts + "-";
		cb(null, finalDate + file.originalname);
	}
});

const upload = multer({ storage: storage });
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	return res.redirect('/');
};
// en el upload.single('...'), ahi dentro tiene que coincidir con el nombre
// del formulario donde se indica el name=""
app.post("/upload", isLoggedIn, upload.array('avatar'), (req, res, next) => { res.redirect('/save') });

app.use(function (req, res, next) {
	res.status(404).render('404', { title: "Sorry, page not found" });
});

app.listen(app.get('port'), app.get('host'), () => {
	console.log('Server is up on port:', app.get('port'), 'on host:', app.get('host'));
});






















/*
const LocalStrategy = require('passport-local').Strategy;

// const databaseRoute = path.join(__dirname, "database.js");

// require(databaseRoute);

const userRoute = path.join(__dirname, "..", "models", "user.js");
const User = require(userRoute);

module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// signup
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, email, password, done) {
			User.findOne({ 'local.email': email }, function (err, user) {
				if (err) { return done(err); }
				if (user) {
					return done(null, false, req.flash('signupMessage', 'Ya existe una cuenta con este correo.'));
				} else {
					var newUser = new User();
					newUser.local.email = email;
					// const initusername = newUser.local.email;
					// let indice = initusername.indexOf("@");
					// const finalusername = initusername.substring(0, indice);
					// const dir = path.join(__dirname, "..", finalusername);
					// mkdirp(dir);
					newUser.local.password = newUser.generateHash(password);
					newUser.save(function (err) {
						if (err) { throw err; }
						return done(null, newUser);
					});
				}
			})
		}));

	// login
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, email, password, done) {
			User.findOne({ 'local.email': email }, function (err, user) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, req.flash('loginMessage', 'No existe ninguna cuenta con este correo'));
				} if (!user.validatePassword(password)) {
					return done(null, false, req.flash('loginMessage', 'La contraseña no es correcta'));
				}
				// SUBIDA DE ARCHIVOS AL SERVIDOR
				const userTransform = email.split('@');
				const userName = userTransform[0];

				console.log("USERNAME: ", userName);
				const dir = path.join(__dirname, "..", userName);

				if (!fs.existsSync(dir)) {
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
				return done(null, user);
			})
		}));
}

// Rutas para comunicar la app con el html y css
const routesRoute = path.join(__dirname, "..", "routes", "routes.js");
require(routesRoute)(app, passport);
*/