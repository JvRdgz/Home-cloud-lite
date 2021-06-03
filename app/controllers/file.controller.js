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




/*
function recuperar(pedido, respuesta) {
	let info = '';
	pedido.on('data', datosparciales => {
		info += datosparciales;
	});
	pedido.on('end', () => {
		const formulario = querystring.parse(info);
		respuesta.writeHead(200, { 'Content-Type': 'text/html' });
		const pagina =
			`<!doctype html><html><head></head><body>
	  Nombre de usuario:${formulario['nombre']}<br>
	  Clave:${formulario['clave']}<br>
	  <a href="index.html">Retornar</a>
	  </body></html>`;
		respuesta.end(pagina);
	});
}
*/




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


	// Crea un elemento <table> y un elemento <tbody>
	// var tabla = document.createElement("table");
	// var tblBody = document.createElement("tbody");
	// var img = document.createElement("img");

	// // Crea las celdas
	// for (var i = 0; i < 2; i++) {
	// 	// Crea las hileras de la tabla
	// 	var hilera = document.createElement("tr");

	// 	for (var j = 0; j < 2; j++) {
	// 		// Crea un elemento <td> y un nodo de texto, haz que el nodo de
	// 		// texto sea el contenido de <td>, ubica el elemento <td> al final
	// 		// de la hilera de la tabla
	// 		var celda = document.createElement("td");
	// 		var textoCelda = document.createTextNode("celda en la hilera " + i + ", columna " + j);
	// 		celda.appendChild(textoCelda);
	// 		hilera.appendChild(celda);
	// 	}

	// 	// agrega la hilera al final de la tabla (al final del elemento tblbody)
	// 	tblBody.appendChild(hilera);
	// }

	// // posiciona el <tbody> debajo del elemento <table>
	// tabla.appendChild(tblBody);
	// appends <table> into <body>
	// body.appendChild(tabla);
	// modifica el atributo "border" de la tabla y lo fija a "2";
	// tabla.setAttribute("border", "2");




	/*
	for (let i in fileJson) {
		for (let j in fileJson[i]) {
			console.log("JSON: ", fileJson[i][j]);
		}
	}
	*/

	/*
	const pagina =
		`<!DOCTYPE html>
			<html lang="en">
			
			<head>
			<meta charset="UTF-8">
			<link rel="shortcut icon" href="#">
			<link rel="icon" type="image/png" href="img/Logo_Mysky_Javi.png" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
			<!--<link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet">-->
			<link rel="stylesheet" href="/css/style.css">
			<!--link rel="stylesheet" href="/css/style2.css">-->
			<!--<script type="text/javascript" src="login/signup.js"></script>-->
			<link rel="preconnect" href="https://fonts.gstatic.com">
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
				<nav>
					<div class="imageheader">
						<a href="/profile" title="Perfil">
							<img src="/img/Logo_Mysky_Javi.png" alt="Perfil" width="120" height="80">
						</a>
					</div>
					<form action="/logout" method="GET">
						<div class="logout">
							<div style="text-align:center;">
								<!-- <input type="submit" value="Cerrar sesion" class="button"> -->
								<p id="prueba1"></p>
							</div>
						</div>
					</form>
					<div class="texto">Mis archivos</div>
					<title>Mis archivos</title>
					<!-- <script type="text/javascript" src="/js/showFiles.js"></script> -->
				</nav>
			</head>
			
			<body class="profile">
			
				<div class="volver">
					<div style="text-align:center;">
						<table class="files">
							<tr>
								<img src="/img/photo.png">
								<!-- <th>${fileJson}</th> -->
							</tr>
							<tr>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Savings</th>
							</tr>
								<tr>
								<td>Peter</td>
								<td>Griffin</td>
								<td>$100</td>
							</tr>
								<tr>
								<td>Lois</td>
								<td>Griffin</td>
								<td>$150</td>
							</tr>
								<tr>
								<td>Joe</td>
								<td>Swanson</td>
								<td>$300</td>
							</tr>
							 <tr>
								<td>Cleveland</td>
								<td>Brown</td>
								<td>$250</td>
							</tr>
							<!-- <input type="file" name="downloadFile"/> -->

						</table>
					</div>
				</div>
			
				<div class="volver">
					<div style="text-align:center;">
						<a href="/profile" class="button">Volver</a>
					</div>
				</div>
				<footer>
					<p>Copyright &copy;2021 | Propiedad de <a href="https://github.com/JvRdgz">Javier Rodriguez Montero</a></p>
				</footer>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
				<script type="text/javascript" src="/js/showFiles.js"></script>
			</body>
			
			</html>`;
	return pagina;
	*/



	/*
	for (var i = 0; i < fileJson.length; i++) {
		console.log("EN LA FUNCION filesTable");
		const myArticle = document.createElement('tr');
		const myH2 = document.createElement('h2');
		const myPara1 = document.createElement('p');
		const myPara2 = document.createElement('p');
		const myPara3 = document.createElement('p');
		const myList = document.createElement('ul');

		myH2.textContent = heroes[i].name;
		myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
		myPara2.textContent = 'Age: ' + heroes[i].age;
		myPara3.textContent = 'Superpowers:';

		const superPowers = heroes[i].powers;
		for (var j = 0; j < superPowers.length; j++) {
			const listItem = document.createElement('li');
			listItem.textContent = superPowers[j];
			myList.appendChild(listItem);
		}

		myArticle.appendChild(myH2);
		myArticle.appendChild(myPara1);
		myArticle.appendChild(myPara2);
		myArticle.appendChild(myPara3);
		myArticle.appendChild(myList);

		section.appendChild(myArticle);
	}
}
*/
module.exports = {
	getListFiles,
	download,
};