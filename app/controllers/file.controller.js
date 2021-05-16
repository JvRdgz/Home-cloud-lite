const fs = require("fs");
const path = require('path');
const baseUrl = "http://localhost:3000/files/";

const getListFiles = (req, res) => {
	const directoryPath = path.join(__dirname, "..", "uploads");

	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			res.status(500).send({
				message: "Error, no se han podido escanear tus archivos.",
			});
		}

		let fileInfos = [];

		files.forEach((file) => {
			fileInfos.push({
				name: file,
				url: baseUrl + file,
			});
		});

		res.status(200).send(fileInfos);
	});
};

const download = (req, res) => {
	const fileName = req.params.name;
	const directoryPath = path.join(__dirname, "..", "uploads");

	res.download(directoryPath + fileName, fileName, (err) => {
		if (err) {
			res.status(500).send({
				message: "Error al descargar el archivo. " + err,
			});
		}
	});
};

module.exports = {
	getListFiles,
	download,
};