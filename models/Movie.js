const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  year: {
    type: Number,
  },
  directorId: {
    type: String,
  },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
