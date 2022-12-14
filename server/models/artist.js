var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
	name: { type: String, required: true, maxLength: 100 },
});

//Export model
module.exports = mongoose.model("Artist", ArtistSchema);