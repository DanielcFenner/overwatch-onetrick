const Hero = require("../models/hero");

const getHome = (req, res) => {
  Hero.find().then((data) => {
    res.json(data);
  });
};

const getResults = (req, res) => {
  // get all heroes and sort by votes
  Hero.find()
    .sort({ votes: -1 })
    .then((data) => {
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
  getResults,
};
