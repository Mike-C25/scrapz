const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CitySchema = new Schema({
	
	date: {
		type: String
	},
	description:{
		type: String
	},
	temperature: {
		type: String
	},
	percip:{
		type: String
	},
	wind:{
		type: String
	},
	humidity:{
		type: String
	}


});

let City = mongoose.model('City', CitySchema);


module.exports = City;