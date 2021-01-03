// Variable PORT coge por defecto el puerto de la variable de entorno.
// En caso contrario coge el puerto 3000.
const PORT = process.env.PORT || 3000;

// Importamos express
const express = require('express');
const app = express();

// Dependencia para el uso de rutas.
const path = require('path');

// Multer nos ayuda a gestionar el formato del fichero de nuestro server.
const multer = require('multer');

// fs nos permitira listar y obtener todos los archivos guardados en una carpeta.
const fs = require('fs');

fs.readdir('../../uploads', function (err, files) {
    if (err) {
        onerror(err);
        return;
    }
    // Aqui deberia de mostrar todos los archivos, mandando esto al frontend
    else if (files.length == 0)
        console.log('No existen archivos.')
    else
        console.log(files);
});

// En esta variable se guarda toda la gestion de la subida de archivos al servidor
let storage = multer.diskStorage({
    destination:(req, file, callback) => {
        // Ruta donde se van a guardar los archivos.
        callback(null, '../../uploads')
    },
    filename:(req, file, callback) => {
        // Aqui se va a crear un nombre para nuestro fichero.
        // El nombre se puede modificar, pero el nombre por defecto
        // nunca se va repetir.
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Nuestro ENDPOINT
app.get('/', (req, res) => {
    // Este mensaje hay que mandarselo al frontend
    return res.send('This is the home page!!!!');
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(`Storage location is ${req.hostname}/${req.file.path}`);
    return (res.send(req.file));
});

app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
