const express = require("express");

const newsFetch = express.Router();
const newsController = require("../controller/fetchNewsApi");

newsFetch.get('/getnews',newsController.newsApi);

module.exports = newsFetch;