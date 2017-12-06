const express = require("express");
const router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

router.get("/weather", function(req, res) {
    // var zip = req.params.zip;
    axios.get("https://weather.com/weather/tenday/l/08807:4:US").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        var result = [];

        $("tbody tr").each(function(i, element) {
            var city = {};

            // console.log($(this).children());

            city.date = $(this)
                .find(".day-detail")
                .text();

            city.description = $(this)
                .find(".description span")
                .text();

            city.temperature = $(this)
                .find(".temp div span")
                .text()
                .replace('°', '° ');

            city.precip = $(this)
                .find(".precip div span:nth-child(2) span")
                .text()
                .replace('%','');;

            city.wind = $(this)
                .find(".wind span")
                .text();

            city.humidity = $(this)
                .find(".humidity span span")
                .text()
                .replace('%', '');

            result.push(city);
        });

        res.json(result);

    });
});


module.exports = router;