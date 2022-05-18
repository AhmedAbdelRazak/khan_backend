/** @format */

const Gallery = require("../models/khangallery");

exports.GalleryById = (req, res, next, id) => {
	Gallery.findById(id).exec((err, gallery) => {
		if (err || !gallery) {
			return res.status(400).json({
				error: "gallery was not found",
			});
		}
		req.gallery = gallery;
		next();
	});
};

// create, remove, list

// exports.create = async (req, res) => {
//   try {
//     // console.log(req.body);
//     // return;
//     const { name, expiry, discount } = req.body;
//     res.json(await new Gallery({ name, expiry, discount }).save());
//   } catch (err) {
//     console.log(err);
//   }
// };
exports.create = (req, res) => {
	const gallery = new Gallery(req.body);
	gallery.save((err, data) => {
		if (err) {
			return res.status(400).json({
				err: "Error in gallery creation",
			});
		}
		res.json({ data });
		console.log(data);
	});
};
exports.remove = (req, res) => {
	const gallery = req.gallery;

	gallery.remove((err, data) => {
		if (err) {
			return res.status(400).json({
				err: "error while removing",
			});
		}
		res.json({ message: "Category deleted" });
	});
};

// exports.remove = async (req, res) => {
//   try {
//     res.json(await Gallery.findByIdAndDelete(req.params.galleryId).exec());
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.list = async (req, res) => {
	try {
		res.json(await Gallery.find({}).sort({ createdAt: -1 }).exec());
	} catch (err) {
		console.log(err);
	}
};
