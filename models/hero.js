const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heroSchema = new Schema({
  name: String,
  imageurl: String,
  votes: Number,
});

const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;
