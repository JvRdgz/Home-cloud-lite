// Variable PORT coge por defecto el puerto de la variable de entorno.
// En caso contrario coge el puerto 3000.
const PORT = process.env.PORT || 3000;

// Importamos express
const express = require('express');
// const expressFileUpload = require('express-fileupload')
const app = express();

// Dependencia para el uso de rutas.
const path = require('path');

// Multer nos ayuda a gestionar el formato del fichero de nuestro server.
const multer = require('multer');

// fs nos permitira listar y obtener todos los archivos guardados en una carpeta.
const fs = require('fs');

const mimeTypes = require('mime-types');

app.use(express.static(__dirname + '/public'));

fs.readdir('./uploads', function (err, files) {
    if (err) {
        onerror(err);
        return;
    }
    // Aqui deberia de mostrar todos los archivos, mandando esto al frontend
    else if (files.length == 0)
        console.log('No existen archivos.');
    else
        console.log(files);
});


/*
// En esta variable se guarda toda la gestion de la subida de archivos al servidor
let storage = multer.diskStorage({
    destination:(req, file, callback) => {
        // Ruta donde se van a guardar los archivos.
        callback(null, '/files')
    },
    filename:(req, file, callback) => {
        // Aqui se va a crear un nombre para nuestro fichero.
        // El nombre se puede modificar, pero el nombre por defecto
        // nunca se va repetir.
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
*/

// const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Nuestro ENDPOINT
// app.get('/', (req, res) => {
//     // Este mensaje hay que mandarselo al frontend
//     return res.send('This is the home page!!!!');
// });

/*
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(`Storage location is ${req.hostname}/${req.file.path}`);
    return (res.send(req.file));
});
*/

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// app.use(expressFileUpload());

// req: informacion de la peticion
// file: archivo que se esta subiendo
// cb: aquello que se va a llamar cuando esta funcion termine.
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        // Aqui se va a crear un nombre para nuestro fichero.
        // El nombre se puede modificar, pero el nombre por defecto
        // nunca se va repetir, y concatenamos la extension del archivo con mimeType
        cb("", Date.now() + "." + file.originalname + mimeTypes.extension(file.mimeTypes));
    }
});

const upload = multer({ storage: storage });

// en el upload.single('...'), ahi dentro tiene que coincidir con el nombre
// del formulario donde se indica el name=""
app.post("/files", upload.array('avatar', 12), (req, res, next) => {
    let file = req.files;
    if (!file) {
        const error = new Error('No has elegido ningun archivo');
        error.httpStatusCode = 400;
        return next(error);
    }
    // SE PUEDEN GUARDAR IMAGENES EN MONGODB
    res.send("Archivos subido correctamente.");
    // return res.status(200).send({ message : `Fichero guardado con exito en ${req.hostname}/${req.file.path}.` });
});

app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
