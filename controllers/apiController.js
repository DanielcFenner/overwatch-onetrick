const Hero = require("../models/hero");

const getHome = (req, res) => {
  Hero.find().then((data) => {
    res.json(data);
  });
};

const addVote = (req, res) => {
  Hero.findById(req.params.id).then((data) => {
    data.votes++;
    data.save();
    res.json(data);
  });
};

module.exports = {
  getHome,
  addVote,
};
