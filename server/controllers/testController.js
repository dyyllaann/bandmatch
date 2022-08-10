var Artist = require("../models/artist");

// Display list of all items.
exports.artist_list = function (req, res) {
	Artist.find({}, "name associated_acts image_url")
		.sort({ name: 1 })
		// .populate('artist')
		.exec(function (err, list_artists) {
			if (err) {
				return next(err);
			}
			res.send({
				artist_list: list_artists,
			});
		});
};
