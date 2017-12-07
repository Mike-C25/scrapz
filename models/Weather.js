const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let WeatherSchema = new Schema({
	
    date: {
        type: String
    },
    description: {
        type: String
    },
    temperature: {
        type: String
    },
    percip: {
        type: String
    },
    wind: {
        type: String
    },
    humidity: {
        type: String
    }


});

let Weather = mongoose.model('Weather', WeatherSchema);


module.exports = Weather;