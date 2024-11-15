const Reclamation = require("../models/reclamation");
const multer = require("multer");
const path = require("path");

// Configure Multer
const storage = multer.diskStorage({
  destination: "./upload-directory",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

exports.getAll = async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};

    if (name) {
      // Case-insensitive search by name
      query = { nom: { $regex: new RegExp(name, "i") } };
    }

    const Reclamations = await Reclamation.find(query);
    res.json(Reclamations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    req.body.image = "specDefaultImg.png";
    const reclamation = new Reclamation(req.body);
    await reclamation.save();
    res.status(201).json(reclamation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ error: " not found" });
    }
    res.json(reclamation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { image, ...updatedFields } = req.body;
    const reclamation = await Reclamation.findByIdAndUpdate(
      req.body._id,
      updatedFields,
      {
        new: true,
      }
    );
    if (!reclamation) {
      return res.status(404).json({ error: " not found" });
    }
    res.json(reclamation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const reclamation = await Reclamation.findByIdAndDelete(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ error: " not found" });
    }
    res.json(reclamation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.uploadImage = async (req, res) => {
//   try {
//     // Access uploaded file via req.file
//     const imagePath = req.file ? req.file.path : null;

//     if (imagePath) {
//       // Extract club ID from request parameters
//       const clubId = req.params.id;
//       const fileName = path.basename(req.file.path);

//       // Update the club with the uploaded image path
//       const updatedClub = await Club.findByIdAndUpdate(
//         clubId,
//         { image: fileName },
//         { new: true }
//       );

//       res.json({ fileName, updatedClub });
//     } else {
//       res.status(400).json({ message: "No image file provided" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.uploadImage = async (req, res) => {
  const { id } = req.params;

  try {
    const reclamation = await Reclamation.findById(id);
    if (!reclamation) {
      return res.status(404).json({ message: " not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get the file name from the file path
    const fileName = path.basename(req.file.path);

    // Update the image field with the file name
    reclamation.image = fileName;

    await reclamation.save();

    res.json(reclamation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
