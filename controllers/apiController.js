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

const resetAll = (req, res) => {
  // reset all votes to 0
  Hero.find().then((data) => {
    data.forEach((hero) => {
      hero.votes = 0;
      hero.save();
    });
    res.json(data);
  });
};

const imageUrl = (req, res) => {
  // change imageurl of every Hero element to .webp
  Hero.find().then((data) => {
    data.forEach((hero) => {
      hero.imageurl = hero.imageurl.replace(".avif", ".webp");
      hero.save();
    });
    res.json(data);
  });
};

module.exports = {
  getHome,
  addVote,
  getResults,
  resetAll,
  imageUrl,
};
