const express = require("express");
const router = express.Router();
const reclamationController = require("../controllers/reclamationController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "upload-directory"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", reclamationController.getAll);
router.post("/", reclamationController.create);
router.post(
  "/uploadImage/:id",
  upload.single("fileImage"),
  reclamationController.uploadImage
);

// router.post(
//   "/uploadImage/:id/",
//   upload.single("image"),
//   reclamationController.uploadImage
// );

router.get("/:id", reclamationController.getById);
router.put("/", reclamationController.update);
router.delete("/:id", reclamationController.delete);

module.exports = router;
