const express = require("express");
const router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models")

router.post("/weather/:zip", function(req, res) {
    var zip = req.params.zip;
    console.log("Setting up location object");
    var url = "https://weather.com/weather/tenday/l/" + zip;
    axios.get(url).then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector

        var $ = cheerio.load(response.data);

        var locationResult = [];
        var weatherResult = [];

        var location = {};
        var loc = $(".locations-title h1").text();

        var city = loc.split(",")[0];
        var state = loc.split(",")[1].split(" ")[1];

        location.zip = zip;
        location.city = city;
        location.state = state;
        locationResult.push(location);

        //Create new Location for collection
        console.log("creating new location document");
        db.Location
            .create(locationResult)
            .then(function(dbLocation) {
                // res.send("Attempting to push data into City Doc")
                res.sendStatus(200);
                console.log("Completed scrape and created Location Doc")
            })
            .then(function() {

                $("tbody tr").each(function(i, element) {
                    var weather = {};

                    weather.date = $(this)
                        .find(".day-detail")
                        .text();

                    weather.description = $(this)
                        .find(".description span")
                        .text();

                    weather.temperature = $(this)
                        .find(".temp div span")
                        .text()
                        .replace('°', '° ');

                    weather.precip = $(this)
                        .find(".precip div span:nth-child(2) span")
                        .text()
                        .replace('%', '');;

                    weather.wind = $(this)
                        .find(".wind span")
                        .text();

                    weather.humidity = $(this)
                        .find(".humidity span span")
                        .text()
                        .replace('%', '');
                    db.Weather
                        .create(weather)
                        .then(function(dbWeather) {
                            console.log(dbWeather);
                            // loop over dbWeather and push all _id's into new array
                            // const idsArray = dbWeather.map(weather => weather._id);
                            return db.Location.findOneAndUpdate({ zip: zip }, { $push: { weather: dbWeather._id } }, { new: true });
                        })
                        .then(function(dbUser) {
                            console.log(dbUser);
                        })
                        .catch(function(err) {
                            // If an error occurs, send it back to the client
                            res.json(err);
                        });
                });

            })
            .then(function() {
                res.sendStatus(200);
            })
            .catch(function(err) {
                res.json(err);
            });



    });
});

router.get("/weather/:zip", function(req, res) {
    // console.log(req.params.zip);
    db.Location
        .find({ zip: req.params.zip })
        .sort({ date: -1 })
        .limit(10)
        .populate('weather')
        .then(function(dbLocation) {
            // res.json(dbLocation);
            let weatherObj = { weather: dbLocation[0].weather}
            res.render("home",weatherObj);
        })
        .catch(function(err) {
            res.json(err);
        })
})


module.exports = router;