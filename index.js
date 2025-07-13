const express = require("express");
const dotenv = require("dotenv");
const indexRoute = require("./src/routes/indexRoute");

dotenv.config();
const app = express();
app.use(express.json());

app.use('/index',indexRoute);


app.listen(process.env.PORT||3000,()=>{
    console.log("Port is Running on local host 3000");
});