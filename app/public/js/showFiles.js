/*
const requestURL = 'http://localhost:3000/files/';

// fetch(requestURL)
// 	.then(response => response.json())
// 	.then(data => console.log(data));
const table = document.querySelector('table');

const request = new XMLHttpRequest();

// console.log(requestURL);
// console.log('Estoy en files.js');

request.open('GET', requestURL, true);
request.send();
request.onreadystatechange = function () {
	if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
		// console.log("JSON desde Cliente: ", this.responseText);
		// let fileInfo = JSON.parse(this.responseText);
		// console.log("Array desde el cliente: ", fileInfo);
		// document.getElementById("prueba1").innerText = fileInfo[0];
		// processingTable(this.responseText);
	}
}
*/
// request.responseType = 'text';
// request.send();

// request.onload = function() {
// 	const fileList = request.response;
// 	processingTable(fileList);
// 	// showFiles(fileList);
// }
/*
function processingTable(jsonObj) {
	const myTr = document.createElement('tr');
	table.appendChild(myTr);
	console.log("Creando fila");
}
*/
/*
function showFiles() {
	// Crea un elemento <table> y un elemento <tbody>
	var tabla = document.getElementById("file-table");
	var tblBody = document.createElement("tbody");

	// Crea las celdas
	for (var i = 0; i < 2; i++) {
		// Crea las hileras de la tabla
		var hilera = document.createElement("tr");

		for (var j = 0; j < 2; j++) {
			// Crea un elemento <td> y un nodo de texto, haz que el nodo de
			// texto sea el contenido de <td>, ubica el elemento <td> al final
			// de la hilera de la tabla
			var celda = document.createElement("td");
			var textoCelda = document.createTextNode("celda en la hilera " + i + ", columna " + j);
			celda.appendChild(textoCelda);
			hilera.appendChild(celda);
		}

		// agrega la hilera al final de la tabla (al final del elemento tblbody)
		tblBody.appendChild(hilera);
	}

	// posiciona el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);
	// appends <table> into <body>
	body.appendChild(tabla);
	// modifica el atributo "border" de la tabla y lo fija a "2";
}
*/

// const fileTable = document.getElementById('file-table');
/*
const imagePreview = document.getElementById("img-preview");
const imageUploader = document.getElementById('img-uploader');
const imageUploadbar = document.getElementById('img-upload-bar');

const CLOUDINARY_URL = ``
const CLOUDINARY_UPLOAD_PRESET = '';

imageUploader.addEventListener('change', async (e) => {
	// console.log(e);
	const file = e.target.files[0];
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

	// Send to cloudianry
	const res = await axios.get(
		CLOUDINARY_URL,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress (e) {
				let progress = Math.round((e.loaded * 100.0) / e.total);
				console.log(progress);
				imageUploadbar.setAttribute('value', progress);
			}
		}
	);
	console.log(res);
	imagePreview.src = res.data.secure_url;
});







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
*/