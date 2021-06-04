const path = require('path');
const fs = require("fs");
const controllerRoute = path.join(__dirname, "..", "controllers", "file.controller");
const controller = require(controllerRoute);

module.exports = (app, passport) => {

	// const indexRoute = path.join(__dirname, "views", "index.ejs");
	app.get("/", (req, res) => {
		res.render('index');
	});

	app.get("/404", (req, res) => {
		res.render("404");
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
	}));

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

	app.get("/info", (req, res) => {
		res.render('info');
	});

	app.get("/files", (req, res) => {
		const directoryPath = path.join(__dirname, "..", "uploads");
		const baseUrl = "http://localhost:3000/files/";
		fs.readdir(directoryPath, function (err, files) {
			if (err) {
				res.status(500).send({
					message: "Error, no se han podido escanear tus archivos.",
				});
			}

			let fileInfos = [];
			var id = 0;
			// const userTransform = email.split('@');
			// const userName = userTransform[0];
			// console.log("nombre: ", files[0]);
			files.forEach((file) => {
				fileInfos.push({
					id: id,
					name: file,
					url: baseUrl + file,
				});
				id++;
			});
			// console.log("Primera posicion del array: ", fileInfos[0]);
			// res.downloadFile(fileInfos[0]);
			// const fileJson = JSON.stringify(fileInfos);
			// const filesTable = showFiles(fileJson);
			// showFiles(fileInfos);
			const fileJson = JSON.stringify(fileInfos);
			// const pagina = showFiles(files, fileInfos);
			// console.log("PROBANDO: ", fileInfos);
			// console.log("Objeto transformado a JSON: ", fileJson);
			// res.end(pagina);
			res.status(200).send(fileJson);
			// res.status(200).render("files");
			// res.end(fileJson);
			// res.status(200).send(fileInfos);
		});
	});

	/*
	app.get("/files", isLoggedIn, controller.getListFiles, (req, res) => {
		res.render('files');
	});

	app.get("/files/:name", isLoggedIn, controller.download);
	*/
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	/*
	app.get('/login', (req, res) => {
		if (res.status(404))
			res.redirect('/404');
		else {
			res.render('login', {
				message: req.flash('loginMessage')
			});
		}
	});
	*/

	app.get("/upload", isLoggedIn, (req, res) => {
		res.render('upload');
	});
	app.get("/save", isLoggedIn, (req, res) => {
		res.render('save');
	});

	app.get("/error", isLoggedIn, (req, res) => {
		res.render('error');
	});

};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	return res.redirect('/');
};
/*
function errorCase(req, res, next) {
	if (res.status(404))
		res.redirect('/404');
	else
		return next();
};
*/