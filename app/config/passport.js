// Dependencia para el uso de rutas.
// const path = require('path');

const LocalStrategy = require('passport-local').Strategy;

// const user = require(path.join(__dirname, "user.js"));

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
		usernameFiled: 'email',
		passwordFiled: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		User.findOne({'local.email': emai}, function (err, user) {
			if (err) { return done(err); }
			if (user) {
				return done(null, false, req.flash('signupMessage', 'Ya existe una cuenta con este correo.'));
			} else {
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);
				newUser.save(function (err) {
					if (err) {throw err;}
					return done(null, newUser);
				});
			}
		})
	}));

	// signin
	passport.use('local-login', new LocalStrategy({
		usernameFiled: 'email',
		passwordFiled: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		User.findOne({'local.email': emai}, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, req.flash('loginMessage', 'No existe ninguna cuenta con este correo'));
			} if (!user.validatePassword(password)) {
				return done(null, false, req.flash('loginMessage', 'La contraseña no es correcta'));
			}
			return done(null, user);
		})
	}));
}