const fs = require("fs");
const path = require('path');
const baseUrl = "http://localhost:3000/files/";
// const baseUrl = process.env.HOST +  ":" + process.env.PORT + "/files/";


const getListFiles = (req, res) => {
	const directoryPath = path.join(__dirname, "..", "uploads");

	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			res.status(500).send({
				message: "Error, no se han podido escanear tus archivos.",
			});
		}

		let fileInfos = [];
		var id = 0;
		files.forEach((file) => {
			fileInfos.push({
				id: id,
				name: file,
				url: baseUrl + file,
			});
			id++;
		});
		console.log("Primera posicion del array: ", fileInfos[0]);
		// res.downloadFile(fileInfos[0]);
		const fileJson = JSON.stringify(fileInfos);
		console.log("Objeto transformado a JSON: ", fileJson);
		// res.status(200).send(fileJson);
		res.status(200).render("files");
		// res.end(fileJson);
		// res.status(200).send(fileInfos);
	});
};

const download = (req, res) => {
	const downloadFile = req.body.downloadFile;
	console.log("Variable downloadFile: ", downloadFile);
	const fileName = req.params.name;
	const directoryPath = path.join(__dirname, "..", "uploads", fileName);

	res.download(directoryPath, fileName, (err) => {
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