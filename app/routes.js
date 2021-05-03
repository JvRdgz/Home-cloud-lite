module.exports = (app, passport) => {

	// const indexRoute = path.join(__dirname, "views", "index.ejs");
	app.get("/", (req, res) => {
		res.render('index');
	});

	app.get('/login', (req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}))

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

	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

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
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {return next();}
	return res.redirect('/');
}