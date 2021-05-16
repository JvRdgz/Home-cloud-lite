const express = require("express");
const path = require('path');
const router = express.Router();
const controllerRoute = path.join(__dirname, "..", "controllers", "file.controller");
const controller = require(controllerRoute);

let routes = (app) => {
	router.get("/files", controller.getListFiles);
	router.get("/files/:name", controller.download);

	app.use(router);
};

module.exports = routes;