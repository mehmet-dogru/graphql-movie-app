const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birth: {
    type: Number,
  },
  movies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Movie",
    },
  ],
});

const Director = mongoose.model("Director", DirectorSchema);

module.exports = Director;
