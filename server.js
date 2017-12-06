const express = require("express");
const exphbs = require('express-handlebars');
const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");




const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraped";
const PORT = process.env.PORT || 3000;
const db = require("./models");
const weather = require("./controllers/weatherController.js");
const home = require("./controllers/homeController.js");

// Initialize Express
const app = express();
const router = express.Router();
// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});


// Vin added this... not sure if we need ?
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
app.use("/", home);
app.use(weather);



// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});