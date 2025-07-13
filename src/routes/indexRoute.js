const express = require("express");
const queryRouter = require("./queryRouter");
const newsFetch = require("./newsFetch");
const indexRoute = express.Router();

indexRoute.use('/queryRoute',queryRouter);
indexRoute.use('/newsRoute',newsFetch);

module.exports = indexRoute;