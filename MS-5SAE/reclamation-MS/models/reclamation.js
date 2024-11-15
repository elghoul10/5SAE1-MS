const mongoose = require("mongoose");

const reclamationSchema = new mongoose.Schema({
  nomReclamation: String,
  description: String,
  image: String,
});

const Reclamation = mongoose.model("Reclamation", reclamationSchema);

module.exports = Reclamation;
