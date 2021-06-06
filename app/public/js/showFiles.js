// axios.get('http://localhost:3000/files').then(res => console.log(res.data));

console.log("hola");

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
	// Great success! All the File APIs are supported.
	console.log("Se puede utilizar el API File.")
} else {
	alert('The File APIs are not fully supported in this browser.');
}

// Recojo el nombre del usuario.
function userName() {
	const form = document.forms['formLogin'];
	const email = form.elements[0].value;
	const userTransform = email.split('@');
	return userTransform[0];
}

const user = userName();

console.log("EMAIL DE USUARIO: ", user);

// EXTENSIONES:

// if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif')


/*
function showFiles(files, fileInfos) {
	const fileJson = JSON.stringify(fileInfos);
	// console.log("Tamaño lista fileJson: ", fileJson.length);
	var extension = null;
	var transformExtension = null;
	const tabla = document.createElement("table");
	const tblBody = document.createElement("tbody");
	const img = document.createElement("img");
	for (var j = 0; j < 4; j++) {
		var col = document.createElement("th");
	}
	for (var i = 0; i < fileInfos.length; i++) {
		var hilera = document.createElement("tr");
		transformExtension = files[i].split('.');
		extension = transformExtension[1];
		console.log("Extension: ", extension);

		// console.log("Num: ", i);
		// const titulo
		// console.log(fileInfos[i].extension);
	}
*/



/*
const mime = {
	'html': 'text/html',
	'css': 'text/css',
	'jpg': 'image/jpg',
	'ico': 'image/x-icon',
	'mp3': 'audio/mpeg3',
	'mp4': 'video/mp4'
};
*/

/*
formulario = [];
function procesar() {
	const form = document.forms['formLogin'];
	const usuario = form.elements[0].value;
	formulario.push(usuario);
	form.reset();
	form.elements[0].focus();
	console.log(formulario);
}
*/


function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	console.log("Archivos: ", files[0].name);

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {

		// Only process image files.
		if (!f.type.match('image.*')) {
			continue;
		}

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				// Render thumbnail.
				var span = document.createElement('span');
				span.innerHTML = ['<img class="thumb" src="', e.target.result,
					'" title="', escape(theFile.name), '"/>'].join('');
				document.getElementById('list').insertBefore(span, null);
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	}
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);




/*
fetch('http://localhost:3000/files')
	.then(response => response.json())
	.then(data => console.log("Datos fetch", data));

*/
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