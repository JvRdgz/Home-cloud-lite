const path = require('path');
require('express-fileupload');
const { Router } = require('express');

const router = Router();

const controllerFilePath = path.join(__dirname, "..", "controllers", "files.js");

console.log(controllerFilePath);

const { renderFiles } = require(controllerFilePath);

// Listar todos los archivos
router.get('files/add', renderFiles);

module.exports = router;