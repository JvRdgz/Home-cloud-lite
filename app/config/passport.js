// Dependencia para el uso de rutas.
const path = require('path');
// fs nos permitira listar y obtener todos los archivos guardados en una carpeta.
const fs = require('fs');
// const mkdirp = require('mkdirp');
// Registro de usuario Local
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

					// Creo la carpeta del usuario.
					userName(email);
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
				const userTransform = email.split('@');
				const username = userTransform[0];
				const dir = path.join(__dirname, "..", username);
				global.dirGlobal = dir;
				console.log("FFFF: ", dirGlobal);
				console.log("Usuario loggeado: ", username);
				console.log("")
				return done(null, user);
			})
		}));
}

function userName(email) {
	const userTransform = email.split('@');
	const username = userTransform[0];

	console.log("Nuevo usuario registrado: ", username);
	const dir = path.join(__dirname, "..", username);
	console.log("Directorio: ", dir);

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
};