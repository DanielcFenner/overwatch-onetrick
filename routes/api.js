const express = require("express");
const apiController = require("../controllers/apiController");

const router = express.Router();

router.get("/", apiController.getHome);
router.get("/results", apiController.getResults);
router.patch("/:id", apiController.addVote);

module.exports = router;
