const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let LocationSchema = new Schema({
    zip: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String
    },
    state:{
    	type: String
    },
    weather: [{
        type: Schema.Types.ObjectId,
        ref: "Weather"
    }]

});

let Location = mongoose.model('Location', LocationSchema);


module.exports = Location;