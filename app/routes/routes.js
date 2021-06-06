const path = require('path');
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

	/*
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
			// res.status(200).send(fileJson);
			res.status(200).render("files");
			// res.end(fileJson);
			// res.status(200).send(fileInfos);
		});
	});
	*/

	app.get("/files", isLoggedIn, (req, res) => {
		res.render('files');
	});

	app.get("/files/:name", isLoggedIn, controller.download);

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

	/*
	function subir () {
		console.log("VARIABLE: ", dirGlobal);
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
			destination: dirGlobal,
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
		app.post("/upload", isLoggedIn, upload.array('avatar'), (req, res, next) => { res.redirect('/save') });
	}
	*/


	// en el upload.single('...'), ahi dentro tiene que coincidir con el nombre
	// del formulario donde se indica el name=""

	app.get("/save", isLoggedIn, (req, res) => {
		res.render('save');
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