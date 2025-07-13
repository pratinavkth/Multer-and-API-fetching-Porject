const express = require("express");
const queryRouter = express.Router();
const queryController = require("../controller/requesting_query");
const upload = require("../middelwares/multer");


queryRouter.post('/textserch',queryController.request_query);
queryRouter.post('/pdfsummary',upload.single('file'),queryController.sendingpdf);
queryRouter.post('/imageserch',upload.single('file'),queryController.sendingimage);

module.exports = queryRouter;