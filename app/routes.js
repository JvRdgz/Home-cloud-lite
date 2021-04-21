module.exports = (app, passport) => {
	app.get("/", (req, res) => {
		res.sendFile(__dirname + path.join("public", "index.html"));
	});

	app.post("/files", upload.array('avatar', 12), (req, res, next) => {
		let file = req.files;
		if (!file) {
			const error = new Error('No has elegido ningun archivo');
			error.httpStatusCode = 400;
			return next(error);
		}
		// SE PUEDEN GUARDAR IMAGENES EN MONGODB
		// window.open("", "", "width=200,height=100");
		res.send("Archivos subido correctamente.");
		// return res.status(200).send({ message : `Fichero guardado con exito en ${req.hostname}/${req.file.path}.` });
	});

	app.get("/files", upload.array('download', 12), (req, res, next) => {
		let file = req.files;
		if (!file) {
			const error = new Error('No has elegido ningun archivo');
			error.httpStatusCode = 400;
			return next(error);
		}
		res.download(file);
	});
};