module.exports = (app, passport) => {
	
	app.get('/login', (req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});

	// app.post('/login', passport.authenticate(''))

	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});
};