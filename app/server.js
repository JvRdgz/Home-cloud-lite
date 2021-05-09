// Variable PORT coge por defecto el puerto de la variable de entorno.
// En caso contrario coge el puerto 3000.
const PORT = process.env.PORT || 3000;


/**
 * REQUERIMIENTOS DE MODULOS DE NODEJS
 */


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
const { pathToFileURL } = require('url');

// Modulo para conectarnos a la base de datos de MongoDB
const mongoose = require('mongoose');

// Modulo para gestionar la autentificacion en el sistema.
const passport = require('passport');

// Modulo para gestion de errores por parte del usuario
const flash = require('connect-flash');

// Modulo para mostrar por consola los metodos http que llegan al servidor
const morgan = require('morgan');

// Modulo para poder administrar cookies
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const session = require('express-session');

// Ficheros estaticos
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

/**
 * CONEXION A LA BASE DE DATOS.
*/

// const bbddRute = require(path.join(__dirname, "config", "database.js"));
// const userbbdd = require(path.join(__dirname, "user.js"));
// const { urlMongoUsers } = require(path.join(__dirname, "config", "database.js"));
// const { urlMongoUsers } = require('./config/database');

// mongoose.connect(urlMongoUsers, {
mongoose.connect('mongodb://localhost:27017/mysky', {
    // Para eliminar el mensaje de la consola
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error al conectar a la BBDD:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('Se ha establecido conexion con la BBDD'); // si esta todo ok, imprime esto
});


app.set('views', path.join(__dirname, 'views'));
// Motor de plantillas.
app.set('view engine', 'ejs');

// Configuracion de passport
const passportRute = path.join(__dirname, "config", "passport.js");
require(passportRute)(passport);

/**
 * MIDDLEWARES
 */


app.use(morgan('dev'));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'elpepe',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Rutas para comunicar la app con el html y css
const routesRute = path.join(__dirname, "routes.js");
require(routesRute)(app, passport);

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

// SUBIDA DE ARCHIVOS AL SERVIDOR
fs.readdir(path.join(__dirname, "uploads"), function (err, files) {
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

// DESCARGA DE ARCHIVOS DESDE EL SERVIDOR
app.get("/files", (req, res, files, err) => {
    let ext = path.extname(req.params.file);
    if (files.length == 0)
        console.log('No existen archivos.')
    else
        console.log(files);
    /*
    if (!ext.match(/^\.(png|jpg)$/)) {
        return res.status(404).end()
    }
    */

    let fd = fs.createReadStream(path.join(__dirname, "uploads",
        req.params.file));

    fd.on("error", (e) => {
        // SI NO ENCUENTRA EL ARCHIVO (ENOENT)
        if (e.code == "ENOENT") {
            res.status(404);

            if (req.accepts('html')) {
                res.setHeader("Content-Type", "text/html");

                res.write("<strong>Error:</strong> Archivo no encontrado.");
            }

            return res.end();
        }

        res.status(500).end();
    });

    res.setHeader("Content-Type", "image/" + ext.substr(1));

    fd.pipe(res);
});

// app.use(expressFileUpload());

// req: informacion de la peticion
// file: archivo que se esta subiendo
// cb: aquello que se va a llamar cuando esta funcion termine.
const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: function (req, file, cb) {
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
    // window.open("", "", "width=200,height=100");
    res.send("Archivos subido correctamente.");
    // return res.status(200).send({ message : `Fichero guardado con exito en ${req.hostname}/${req.file.path}.` });
});

/*
app.get("/files", upload.array('download', 12), (req, res, next) => {
    let file = req.files;
    if (!file) {
        const error = new Error('No has elegido ningun archivo');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.download(file);
});
*/

app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
